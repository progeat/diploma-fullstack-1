import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Icon, Input } from '../../../../components';
import { CLOSE_MODAL, openModal, updateCategories } from '../../../../actions';
import { request } from '../../../../utils';
import styled from 'styled-components';

const categoryFormSchema = yup.object().shape({
	name: yup
		.string()
		.required('Заполните название')
		.min(3, 'Неверно заполнено название. Минимум 3 символа'),
	type: yup.object({ value: yup.number() }).required('Выберите тип категории'),
	icon: yup.object({ value: yup.string() }).required('Выберите иконку'),
	color: yup.string().required('Выберите цвет для иконки'),
});

// TODO сделать константу под категории
const categoryTypeOptions = [
	{ value: 0, label: 'Расход' },
	{ value: 1, label: 'Доход' },
];

const iconsOptions = [
	{ value: 'fa fa-shopping-basket', label: 'Магазины' },
	{ value: 'fa fa-cutlery', label: 'Кафе и рестораны' },
	{ value: 'fa fa-car', label: 'Автомобиль' },
	{ value: 'fa fa-home', label: 'Жильё' },
	{ value: 'fa fa-shopping-bag', label: 'Одежда' },
	{ value: 'fa fa-gamepad', label: 'Развлечения' },
	{ value: 'fa fa-heartbeat', label: 'Аптеки' },
	{ value: 'fa fa-taxi', label: 'Такси' },
	{ value: 'fa fa-exchange', label: 'Перевод' },
	{ value: 'fa fa-money', label: 'Зарплата' },
	{ value: 'fa fa-plane', label: 'Путешествия' },
	{ value: 'fa fa-handshake-o', label: 'Подработка' },
];

const FormatOptionLabel = ({ value, label }) => {
	return (
		<article className="icon-option">
			<Icon
				color="#fff"
				inactive="true"
				id={value}
				size="18px"
				margin="0 10px 0 0"
				onClick={() => {}}
			/>
			<div>{label}</div>
		</article>
	);
};

const CategoryFormContainer = ({ className, categories }) => {
	const [serverError, setServerError] = useState(null);
	const [isServerPass, setIsServerPass] = useState(null);
	const params = useParams();
	const isEditing = categories.find((category) => category.id === params.id);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		register,
		control,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: isEditing?.name || '',
			type: categoryTypeOptions[isEditing?.type] || categoryTypeOptions[0],
			icon: isEditing?.icon || null,
			color: isEditing?.color || '#78D9C5',
		},
		resolver: yupResolver(categoryFormSchema),
	});

	const onSubmit = ({ name, type, icon, color }) => {
		request(`/categories/${params.id || ''}`, `${params.id ? 'PATCH' : 'POST'}`, {
			name,
			type: type.value,
			icon: icon.value,
			color,
		}).then(({ error, data }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			setIsServerPass(true);
			dispatch(updateCategories);
			if (!isEditing) {
				reset();
			}
		});
	};

	const onDeleteCategory = (id) => {
		dispatch(
			openModal({
				text: 'Удалить категорию?',
				onConfirm: () => {
					request(`/categories/${id}`, 'DELETE').then(() => {
						dispatch(updateCategories);
						navigate(-1);
					});

					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const formError = errors?.name?.message || errors?.type?.message;
	const errorMessage = formError || serverError;

	return (
		<form className={className} onSubmit={handleSubmit(onSubmit)}>
			<Input
				type="text"
				placeholder="Название категории..."
				{...register('name', {
					onChange: () => {
						setServerError(null);
						setIsServerPass(null);
					},
				})}
			/>
			{/* TODO подумать о реализации табом */}
			<Controller
				name="type"
				control={control}
				render={({ field }) => (
					<Select
						{...field}
						className="select"
						classNamePrefix="select"
						options={categoryTypeOptions}
						placeholder="Выберите тип категории"
					/>
				)}
			/>
			<Controller
				name="icon"
				control={control}
				render={({ field }) => (
					<Select
						{...field}
						className="select"
						classNamePrefix="select"
						options={iconsOptions}
						formatOptionLabel={FormatOptionLabel}
						placeholder="Выберите иконку"
					/>
				)}
			/>
			<Input
				type="color"
				placeholder="Выберите цвет..."
				{...register('color', {
					onChange: () => {
						setServerError(null);
						setIsServerPass(null);
					},
				})}
			/>
			<Button className="button-submit" type="submit" disabled={!!formError}>
				Отправить
			</Button>
			{errorMessage && <div className="error">{errorMessage}</div>}
			{isServerPass && <div className="pass">Отправленно</div>}
			{isEditing && (
				<button
					className="delete-button"
					type="button"
					onClick={() => onDeleteCategory(params.id)}
				>
					Удалить категорию
				</button>
			)}
		</form>
	);
};

export const CategoryForm = styled(CategoryFormContainer)`
	display: flex;
	flex-direction: column;

	& input {
		margin-bottom: 10px;
	}

	& .select {
		margin-bottom: 10px;
		width: 100%;
	}

	& .error {
		color: red;
	}

	& input {
		margin-bottom: 10px;
		border-radius: 8px;
		border-color: #5e636f;
		color: #f8f8f9;
	}

	& input:not(:first-child) {
		margin-bottom: 20px;
	}

	& input:hover {
		outline: 2px solid #f8f8f9;
	}

	& .select {
		margin-bottom: 10px;
		width: 100%;
	}

	& .select__control {
		height: 40px;
		border-radius: 8px;
		border-color: #5e636f;
	}

	& .select__control,
	.select__menu {
		background-color: #2b2d32;
	}

	& .select__placeholder,
	.select__single-value {
		color: #f8f8f9;
	}

	& .select__control:hover {
		border-color: #f8f8f9;
		box-shadow: 0 0 0 1px #f8f8f9;
	}

	& .select__control--is-focused {
		border-color: #f8f8f9;
		box-shadow: 0 0 0 1px #f8f8f9;
	}

	& .select__menu {
		z-index: 10;
	}

	& .select__option:hover,
	.select__option--is-focused {
		color: #2b2d32;
		background-color: #f8f8f9;
	}

	& .select__option--is-selected {
		color: #4d525f;
		background-color: rgb(179, 179, 179);
	}

	& .icon-option,
	icon-single-value {
		display: flex;
	}

	& .button-submit {
		margin-bottom: 10px;
		height: 38px;
		border: 1px solid #f8f8f9;
		border-radius: 8px;
		color: #f8f8f9;
		background-color: #2b2d32;
	}

	& .button-submit:hover {
		color: #000;
		background-color: #f8f8f9;
	}

	& .delete-button {
		text-align: left;
		width: max-content;
		border: 0;
		color: rgb(156, 156, 156);
		background-color: inherit;
		cursor: pointer;
	}

	& .delete-button:hover {
		color: #f8f8f9;
	}

	& .pass {
		color: #6ccb81;
	}

	& .error {
		color: rgb(203, 108, 108);
	}
`;
