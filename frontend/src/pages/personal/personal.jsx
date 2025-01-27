import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '../../components';
import { PersonalForm } from './components';
import { setUser } from '../../actions';
import { request } from '../../utils';
import styled from 'styled-components';

const PersonalContainer = ({ className }) => {
	const [serverError, setServerError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const dispatch = useDispatch();

	useEffect(() => {
		request('/user')
			.then(({ error, user }) => {
				if (error) {
					setServerError(`Ошибка запроса: ${error}`);
					return;
				}

				dispatch(setUser(user));
				sessionStorage.setItem('userData', JSON.stringify(user));
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [dispatch]);

	if (serverError) {
		<div className="error">{serverError}</div>;
	}

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className={className}>
			<PersonalForm />
		</div>
	);
};

export const Personal = styled(PersonalContainer)`
	display: flex;
	justify-content: center;
	align-items: center;

	& .form-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 281px;
		padding: 20px;
		background-color: #ddd;
	}

	& .form {
		display: flex;
		flex-direction: column;
	}

	& .form input {
		margin-bottom: 10px;
	}
`;
