import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Icon, Loader } from '../../../../../../../../components';
import { selectIsLoadingStatistics } from '../../../../../../../../selectors';
import styled from 'styled-components';

const ListStatisticsComponent = ({ className, value }) => {
	const navigate = useNavigate();
	const isLoading = useSelector(selectIsLoadingStatistics);

	if (isLoading) {
		return <Loader />;
	}

	if (!value.length) {
		return (
			<Icon
				style={{ textAlign: 'center' }}
				id="fa-plus-circle"
				margin="0"
				size="80px"
				onClick={() => navigate('/transaction')}
			/>
		);
	}

	return (
		<ul className={className}>
			{value.map(({ id, category, count, total }) => (
				<li className="item" key={id}>
					<div className="item-left">
						<div className="item-title">{category}</div>
						<div className="item-info">Операций: {count}</div>
					</div>
					<div className="item-right">{total} ₽</div>
				</li>
			))}
		</ul>
	);
};

export const ListStatistics = styled(ListStatisticsComponent)`
	& .item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 12px;
		padding: 5px 10px;
		background-color: #393d47;
	}

	& .item:not(:last-child) {
		margin-bottom: 8px;
	}

	& .item-left {
		display: flex;
		flex-direction: column;
	}

	.item-title {
		margin-bottom: 3px;
		font-size: 16px;
		font-weight: 600;
	}

	.item-info {
		font-size: 12px;
		color: #8d8d8d;
	}

	.item-right {
		font-size: 16px;
		font-weight: 600;
	}
`;
