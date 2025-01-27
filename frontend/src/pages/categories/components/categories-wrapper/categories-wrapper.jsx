import { useSelector } from 'react-redux';
import { CategoriesList } from './components';
import { TYPE_CATEGORY } from '../../../../constants';
import { selectCategories } from '../../../../selectors';
import styled from 'styled-components';

const CategoriesWrapperContainer = ({ className }) => {
	const categories = useSelector(selectCategories);

	if (!categories.length) {
		return <p>Категорий нет</p>;
	}

	return (
		<div className={className}>
			<CategoriesList categories={categories} typeCategory={TYPE_CATEGORY.INCOME} />
			<CategoriesList
				categories={categories}
				typeCategory={TYPE_CATEGORY.EXPENSE}
			/>
		</div>
	);
};

export const CategoriesWrapper = styled(CategoriesWrapperContainer)`
	display: flex;
	justify-content: center;

	& > div:not(:last-child) {
		margin-right: 20px;
	}
`;
