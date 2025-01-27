import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import {
	RESET_FILTER_ACCOUNT,
	RESET_FILTER_CATEGORY,
	RESET_FILTER_DATE,
	setFilterAccount,
	setFilterCategory,
	setFilterDate,
} from '../../../../actions';
import { selectAccounts, selectCategories } from '../../../../selectors';
import styled from 'styled-components';

const createSelectorOptions = (arrayValues) =>
	arrayValues.map((obj) => ({ value: obj.id, label: obj.name }));

const ControlPanelContainer = ({ className }) => {
	const accounts = useSelector(selectAccounts);
	const categories = useSelector(selectCategories);

	const accountsOptions = createSelectorOptions(accounts);
	const categoriesOptions = createSelectorOptions(categories);

	const dispatch = useDispatch();

	const [dateRange, setDateRange] = useState([null, null]);
	const [startDate, endDate] = dateRange;

	const onSetFilterDate = ([start, end]) => {
		setDateRange([start, end]);

		if (start && end) {
			dispatch(
				setFilterDate({
					start: Date.parse(start),
					end: new Date(end).setDate(end.getDate() + 1),
				}),
			);
		} else if (!start && !end) {
			dispatch(RESET_FILTER_DATE);
		}
	};

	const onSetFilterAccount = (select) => {
		if (select !== null) {
			dispatch(setFilterAccount(select.value));
		} else {
			dispatch(RESET_FILTER_ACCOUNT);
		}
	};

	const onSetFilterCategory = (select) => {
		if (select !== null) {
			dispatch(setFilterCategory(select.value));
		} else {
			dispatch(RESET_FILTER_CATEGORY);
		}
	};

	return (
		<div className={className}>
			<h4>Фильтры :</h4>
			<Select
				className="select"
				classNamePrefix="select"
				options={accountsOptions}
				placeholder="по счёту"
				onChange={onSetFilterAccount}
				isClearable
			/>
			<Select
				className="select"
				classNamePrefix="select"
				options={categoriesOptions}
				placeholder="по категории"
				onChange={onSetFilterCategory}
				isClearable
			/>
			{/* TODO добавить возможность сбрасывать выбор даты*/}
			<DatePicker
				selected={startDate}
				onChange={onSetFilterDate}
				startDate={startDate}
				endDate={endDate}
				selectsRange
				inline
			/>
			<div className="link-wrapper">
				<Link className="link" to="/transaction">
					Добавить операцию
				</Link>
			</div>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	flex-direction: column;
	height: 100%;
	border-radius: 24px;
	padding: 10px 10px 20px;
	background-color: #2b2d32;

	& h4 {
		margin: 10px;
	}

	& .react-datepicker {
		border: 0;
		background-color: #2b2d32;
	}

	& .react-datepicker .react-datepicker__month-container,
	.react-datepicker .react-datepicker__header {
		border-top-right-radius: 8px;
		border-top-left-radius: 8px;
		color: #f8f8f9;
		background-color: #2b2d32;
	}

	& .react-datepicker__current-month,
	.react-datepicker__day-name,
	.react-datepicker__day {
		color: #f8f8f9;
	}

	& .react-datepicker__day:hover {
		color: #2b2d32;
	}

	& .select {
		margin-bottom: 10px;
	}

	& .select__control {
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

	& .link-wrapper {
		margin-top: auto;
		display: flex;
		justify-content: center;
	}

	& .link {
		display: inline-block;
		text-align: center;
		margin: 0 auto;
		width: 100%;
		max-width: 200px;
		border: 1px solid #f8f8f9;
		border-radius: 8px;
		padding: 5px 5px 8px;
		color: #f8f8f9;
		background-color: #2b2d32;
	}

	& .link:hover {
		color: #000;
		background-color: #f8f8f9;
	}
`;
