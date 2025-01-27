import { useNavigate } from 'react-router-dom';
import { Icon, Loader } from '../../../../components';
import { TransactionItem } from './components';
import styled from 'styled-components';

const TransactionsListContainer = ({
	className,
	transactions,
	isLoading = true,
	setTriggerFlag,
}) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<div className="list">
				{isLoading ? (
					<Loader />
				) : transactions.length > 0 ? (
					transactions.map(
						({ id, account, category, amount, comment, createdAt }) => (
							<TransactionItem
								key={id}
								id={id}
								account={account}
								category={category}
								amount={amount}
								comment={comment}
								createdAt={createdAt}
								setTriggerFlag={setTriggerFlag}
							/>
						),
					)
				) : (
					<>
						<div>Список операций пуст</div>
						<Icon
							style={{ textAlign: 'center' }}
							id="fa-plus-circle"
							margin="0"
							size="80px"
							onClick={() => navigate('/transaction')}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export const TransactionsList = styled(TransactionsListContainer)`
	position: relative;
	width: 100%;
	min-height: 370px;
	height: 100%;
	border-radius: 12px;
	padding: 12px;
	background-color: #2b2d32;

	& .list > div:not(:last-child) {
		margin-bottom: 10px;
	}
`;
