import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../../../../components';
import { ListAccounts, ListStatistics } from './components';
import styled from 'styled-components';

const CardInfoContainer = ({ className, title, value, path }) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<div className="header">
				<h3 className="top-panel">{title}</h3>
				{value.length !== 0 && (
					<Icon id="fa-plus-circle" margin="0" onClick={() => navigate(path)} />
				)}
			</div>
			{path === '/account' ? (
				<ListAccounts value={value} />
			) : (
				<ListStatistics value={value} />
			)}
		</div>
	);
};

export const CardInfo = styled(CardInfoContainer)`
	position: relative;
	display: flex;
	flex-direction: column;
	width: 100%;
	border: 1px solid transparent;
	border-radius: 24px;
	padding: 10px 12px 15px 12px;
	background-color: #2b2d32;

	& .header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`;
