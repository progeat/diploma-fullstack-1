import { useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';
import { AccountForm } from './components';
import { selectAccounts } from '../../selectors';
import styled from 'styled-components';

const AccountContainer = ({ className }) => {
	const isEditing = !!useMatch('/account/:id/edit');
	const accounts = useSelector(selectAccounts);

	return (
		<div className={className}>
			<div className="form-wrapper">
				<h2>{isEditing ? 'Редактирование счёта' : 'Новый счёт'}</h2>
				<AccountForm accounts={accounts} />
			</div>
		</div>
	);
};

export const Account = styled(AccountContainer)`
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

	& .error {
		color: red;
	}
`;
