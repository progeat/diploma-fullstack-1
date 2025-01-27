import { useNavigate } from 'react-router-dom';
import { Icon } from '../../components';
import { CategoriesWrapper } from './components';
import styled from 'styled-components';

const CategoriesContainer = ({ className }) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<div className="top">
				<h2>Категории</h2>
				<Icon
					id="fa-plus-circle"
					margin="0"
					onClick={() => navigate('/category')}
				/>
			</div>
			<CategoriesWrapper />
		</div>
	);
};

export const Categories = styled(CategoriesContainer)`
	display: flex;
	flex-direction: column;
	height: 100%;
	padding: 30px;

	& .top {
		display: flex;
		align-items: center;
	}

	& h2 {
		margin-right: 10px;
	}
`;
