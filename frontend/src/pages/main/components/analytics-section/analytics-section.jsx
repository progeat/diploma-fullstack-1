import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ControlPanelAnalytics, ExpensesChart, IncomeChart } from './components';
import { selectStatistics } from '../../../../selectors';
import styled from 'styled-components';

const AnaliticsSectionContainer = ({ className }) => {
	const [isActiveExpenses, setIsActiveExpenses] = useState(true);
	const statistics = useSelector(selectStatistics);

	return (
		<div className={className}>
			<ControlPanelAnalytics
				isActiveExpenses={isActiveExpenses}
				setIsActiveExpenses={setIsActiveExpenses}
			/>
			<div className="analytics">
				{isActiveExpenses ? (
					<ExpensesChart expenses={statistics.expenses} />
				) : (
					<IncomeChart income={statistics.income} />
				)}
			</div>
		</div>
	);
};

export const AnalyticsSection = styled(AnaliticsSectionContainer)`
	position: relative;

	& .analytics {
		margin: 0 auto;
		width: 400px;
	}
`;
