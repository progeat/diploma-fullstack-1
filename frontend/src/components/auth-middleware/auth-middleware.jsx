import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';

export const AuthMiddleWare = () => {
	const roleId = useSelector(selectUserRole);

	if (roleId === ROLE.GUEST) {
		return <Navigate to="/login" />;
	}

	return <Outlet />;
};
