import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { RootState } from '../../../store/store';

const PrivateRoute = () => {
    const { isLoggedIn, token } = useSelector((state: RootState) => state.auth);

    return isLoggedIn && token ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
