import { Chart, ArcElement } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement);

export const ExpensesChart = ({ expenses }) => {
	const data = {
		labels: expenses.map(({ category }) => category),
		datasets: [
			{
				label: 'Расходы',
				data: expenses.map(({ total }) => total),
				backgroundColor: expenses.map(({ color }) => color),
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
