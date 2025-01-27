import { Chart, ArcElement } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement);

export const IncomeChart = ({ income }) => {
	const data = {
		labels: income.map(({ category }) => category),
		datasets: [
			{
				label: 'Доходы',
				data: income.map(({ total }) => total),
				backgroundColor: income.map(({ color }) => color),
				borderColor: '#141414',
			},
		],
	};

	const options = {
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: true,
				position: 'left',
			},
		},
	};

	return <Doughnut data={data} options={options} />;
};
