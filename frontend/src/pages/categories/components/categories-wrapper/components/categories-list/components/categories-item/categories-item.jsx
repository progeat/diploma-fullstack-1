import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Icon } from '../../../../../../../../components';
import {
	CLOSE_MODAL,
	openModal,
	updateCategories,
} from '../../../../../../../../actions';
import { request } from '../../../../../../../../utils';
import styled from 'styled-components';

const CategoriesItemContainer = ({ className, category }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id, name, icon = 'fa fa-question', color = 'pink' } = category;

	const onCategoryRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить категорию?',
				onConfirm: () => {
					request(`/categories/${id}`, 'DELETE').then(() => {
						dispatch(updateCategories);
					});

					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<li className={className}>
			<div className="item-icon" color={color}>
				<Icon id={icon} margin="0" size="15px" color="#f8f8f9" />
			</div>
			<div className="item-title">{name}</div>
			<div className="item-control">
				<Icon
					id="fa-pencil"
					margin="0 10px 0 0"
					size="18px"
					onClick={() => navigate(`/category/${id}/edit`)}
				/>
				<Icon id="fa-trash-o" size="18px" onClick={() => onCategoryRemove(id)} />
			</div>
		</li>
	);
};

export const CategoriesItem = styled(CategoriesItemContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	border-radius: 12px;
	padding: 10px 15px 10px 20px;
	background-color: #393d47;

	& .item-icon {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 10px;
		border-radius: 50px;
		width: 30px;
		height: 30px;
		color: #fff;
		background-color: ${({ category }) => (category.color ? category.color : 'pink')};
	}

	& .item-title {
		margin-right: 10px;
	}

	& .item-control {
		display: flex;
	}
`;
