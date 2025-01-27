import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AnalyticsSection, FinancesSection } from './components';
import { setIsLoadingStatistics, setStatistics } from '../../actions';
import { request } from '../../utils';
import styled from 'styled-components';

const MainContainer = ({ className }) => {
	const [errorMessage, setErrorMessage] = useState(null);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setIsLoadingStatistics(true));
		request('/statistics?period=1')
			.then((statisticsRes) => {
				if (statisticsRes.error) {
					setErrorMessage(statisticsRes.error);
					return;
				}

				dispatch(setStatistics(statisticsRes.data));
			})
			.finally(() => {
				dispatch(setIsLoadingStatistics(false));
			});
	}, [dispatch]);

	return (
		<div className={className}>
			{errorMessage && (
				<div className="error-message">
					Ошибка при загрузки данных: {errorMessage}
				</div>
			)}
			<FinancesSection />
			<AnalyticsSection />
		</div>
	);
};

export const Main = styled(MainContainer)`
	display: flex;
	flex-direction: column;
	padding: 0 20px;

	& .error-message {
		color: red;
	}
`;
