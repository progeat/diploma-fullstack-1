import { useSelector } from 'react-redux';
import { CardInfo } from './components';
import { selectAccounts, selectStatistics } from '../../../../selectors';
import styled from 'styled-components';
import { TYPE_ACCOUNT } from '../../../../constants';

const FinancesSectionContainer = ({ className }) => {
	const accounts = useSelector(selectAccounts);
	const statistics = useSelector(selectStatistics);
	const totalSavings = accounts.reduce((acc, account) => {
		if (account.type !== TYPE_ACCOUNT.CREDIT) {
			acc += account.balance;

			return acc;
		}

		return acc;
	}, 0);

	return (
		<div className={className}>
			<div className="header-info">
				Всего накоплений:
				<span className="total-savings"> {totalSavings} ₽</span>
			</div>
			<div className="cards-wrapper">
				<CardInfo title="Доходы" path="/transaction" value={statistics.income} />
				<CardInfo title="Счета" path="/account" value={accounts} />
				<CardInfo
					title="Расходы"
					path="/transaction"
					value={statistics.expenses}
				/>
			</div>
		</div>
	);
};

export const FinancesSection = styled(FinancesSectionContainer)`
	padding: 20px;

	& .header-info {
		margin-bottom: 20px;
		color: #777;
	}

	& .total-savings {
		font-weight: 600;
		color: #f8f8f9;
	}

	& .cards-wrapper {
		display: flex;
		justify-content: space-between;
		min-height: 500px;
	}

	& .cards-wrapper > div:not(:last-child) {
		margin-right: 15px;
	}

	& .error-message {
		color: red;
	}
`;
