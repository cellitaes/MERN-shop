import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { RootState } from '../../../store/store';

const AdminRoute = () => {
    const { isLoggedIn, token, isAdmin } = useSelector(
        (state: RootState) => state.auth
    );

    return isLoggedIn && token && isAdmin ? (
        <Outlet />
    ) : (
        <Navigate to="/auth/login" />
    );
};

export default AdminRoute;
