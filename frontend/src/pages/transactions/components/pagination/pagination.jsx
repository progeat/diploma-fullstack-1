import { Button } from '../../../../components';
import styled from 'styled-components';

const PaginationContainer = ({ className, page, lastPage, setPage }) => {
	return (
		<div className={className}>
			<Button
				className="pagination-button"
				disabled={page === 1}
				onClick={() => setPage(1)}
			>
				В начало
			</Button>
			<Button
				className="pagination-button"
				disabled={page === 1}
				onClick={() => setPage(page - 1)}
			>
				Предыдущая
			</Button>
			<div className="current-page">Страница: {page}</div>
			<Button
				className="pagination-button"
				disabled={page === lastPage}
				onClick={() => setPage(page + 1)}
			>
				Следующая
			</Button>
			<Button
				className="pagination-button"
				disabled={page === lastPage}
				onClick={() => setPage(lastPage)}
			>
				В конец
			</Button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	width: 100%;

	& button {
		margin: 0 5px;
	}

	& .current-page {
		text-align: center;
		margin: 0px 5px;
		width: 100%;
		height: 32px;
		border: 1px solid #000;
		font-size: 18px;
		font-weight: 500;
		line-height: 26px;
	}

	& .pagination-button {
		color: #080808;
		background-color: #d1d1d1;
	}

	& .pagination-button:hover {
		background-color: #f8f8f9;
	}

	& .pagination-button:disabled {
		border-color: #393d47;
		color: #141414;
		background-color: #393d47;
	}
`;
