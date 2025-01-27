import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useMatch, useNavigate } from 'react-router-dom';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';
import { LOGOUT, RESET_ACCOUNTS, RESET_CATEGORIES } from '../../actions';
import { selectUserLogin, selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';
import styled from 'styled-components';

const HeaderContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const login = useSelector(selectUserLogin);
	const roleId = useSelector(selectUserRole);
	const isLoginPage = !!useMatch('/login');

	const onLogout = () => {
		dispatch(LOGOUT);
		dispatch(RESET_ACCOUNTS);
		dispatch(RESET_CATEGORIES);
		sessionStorage.removeItem('userData');
		navigate('/login');
	};

	return (
		<div className={className}>
			<div className="buttons">
				<Icon
					id="fa fa-chevron-circle-left"
					margin="0 15px 0 0"
					onClick={() => navigate(-1)}
				/>
				<NavLink className="link" to="/" activeclassname="active-link">
					Главная
				</NavLink>
				<NavLink
					className="link"
					to="/transactions"
					activeclassname="active-link"
				>
					История
				</NavLink>
				<NavLink className="link" to="/categories" activeclassname="active">
					Категории
				</NavLink>
			</div>
			<div className="login-control">
				{roleId === ROLE.GUEST ? (
					!isLoginPage && (
						<Button>
							<Link to="/login">Войти</Link>
						</Button>
					)
				) : (
					<>
						<div className="login">{login}</div>
						<Icon
							id="fa-cog"
							margin="0 10px 0 0"
							onClick={() => navigate('/personal')}
						/>
						<Icon id="fa-sign-out" onClick={onLogout} />
					</>
				)}
			</div>
		</div>
	);
};

export const Header = styled(HeaderContainer)`
	position: fixed;
	z-index: 1000;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 70px;
	width: 100%;
	min-width: 1000px;
	padding: 0 30px;
	background-color: rgb(26 26 26 / 70%);
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Тень */
	backdrop-filter: blur(20px);

	& .buttons {
		display: flex;
		align-items: center;
	}

	& .buttons > a:not(:last-child) {
		margin-right: 10px;
	}

	& .link {
		padding-bottom: 3px;
		border-bottom: 2px solid transparent;
	}

	& .link:hover {
		border-color: #f8f8f9;
	}

	& .active {
		border-color: #f8f8f9;
	}

	& .login-control {
		display: flex;
		align-items: center;
	}

	& .login {
		margin-right: 10px;
	}
`;
