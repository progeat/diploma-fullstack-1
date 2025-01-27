import styled from 'styled-components';
import { Button } from '../../../../../../components';

const ControlPanelAnalyticsContainer = ({
	className,
	isActiveExpenses,
	setIsActiveExpenses,
}) => {
	const onToggle = () => setIsActiveExpenses((prev) => !prev);

	return (
		<div className={className}>
			<div className="button-wrapper">
				<Button
					className="tab-button"
					width="120px"
					onClick={onToggle}
					disabled={isActiveExpenses}
				>
					Расходы
				</Button>
				<Button
					className="tab-button"
					width="120px"
					onClick={onToggle}
					disabled={!isActiveExpenses}
				>
					Доходы
				</Button>
			</div>
		</div>
	);
};

export const ControlPanelAnalytics = styled(ControlPanelAnalyticsContainer)`
	display: flex;

	& .button-wrapper {
		display: flex;
		border: 2px solid #393d47;
		border-radius: 8px;
		background-color: #393d47;
	}

	& > button:not(:last-child) {
		margin-right: 10px;
	}

	& .tab-button:not(:disabled) {
		color: #777;
	}

	& .tab-button:not(:disabled):hover {
		color: #eee;
	}
`;
