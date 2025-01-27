import { useMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CategoryForm } from './components';
import { selectCategories } from '../../selectors';
import styled from 'styled-components';

const CategoryContainer = ({ className }) => {
	const isEditing = !!useMatch('/transaction/:id/edit');
	const categories = useSelector(selectCategories);

	return (
		<div className={className}>
			<div className="form-wrapper">
				<h2>{isEditing ? 'Редактирование категории' : 'Новая категория'}</h2>
				<CategoryForm categories={categories} />
			</div>
		</div>
	);
};

export const Category = styled(CategoryContainer)`
	display: flex;
	justify-content: center;
	align-items: center;

	& .form-wrapper {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 281px;
		border-radius: 24px;
		padding: 20px;
		background-color: #2b2d32;
	}
`;
