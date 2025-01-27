import { useEffect, useState } from 'react';
import { useMatch, useParams } from 'react-router-dom';
import { Loader } from '../../components';
import { request } from '../../utils';
import styled from 'styled-components';
import { TransactionForm } from './components';
import { useSelector } from 'react-redux';
import { selectAccounts, selectCategories } from '../../selectors';

const TransactionContainer = ({ className }) => {
	const [transaction, setTransaction] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const params = useParams();
	const isEditing = !!useMatch('/transaction/:id/edit');
	const accounts = useSelector(selectAccounts);
	const categories = useSelector(selectCategories);

	useEffect(() => {
		if (!isEditing) {
			return;
		}

		setIsLoading(true);

		request(`/transactions/${params.id}`).then((transactionRes) => {
			if (transactionRes.error) {
				console.error(transactionRes.error);
			}

			setTransaction(transactionRes.data);
			setIsLoading(false);
		});
	}, [isEditing, params.id]);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className={className}>
			<div className="form-wrapper">
				<h2>{isEditing ? 'Редактирование операции' : 'Новая операция'}</h2>
				<TransactionForm
					transaction={transaction}
					transactionId={params?.id}
					accounts={accounts}
					categories={categories}
				/>
			</div>
		</div>
	);
};

export const Transaction = styled(TransactionContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;

	& .form-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 24px;
		padding: 15px 35px 25px 30px;
		background-color: #2b2d32;
	}
`;
