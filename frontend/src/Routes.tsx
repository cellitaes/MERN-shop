import { Routes as AppRoutes, Navigate, Route } from 'react-router-dom';

import AdminRoute from './shared/components/Routes/AdminRoutes';
import Auth from './routes/auth/pages/Auth';
import Cart from './routes/cart/pages/Cart';
import ManageProducts from './routes/manageProducts/pages/ManageProducts';
import ManageUsers from './routes/users/pages/ManageUsers';
import Order from './routes/order/pages/Order';
import PageNotFound from './routes/errorPages/pages/PageNotFound';
import PrivateRoute from './shared/components/Routes/PrivateRoute';
import PublicRoute from './shared/components/Routes/PublicRoute';
import Shop from './routes/shop/pages/Shop';
import UnauthorizedPage from './routes/errorPages/pages/UnauthorizedPage';

const Routes = () => {
    return (
        <AppRoutes>
            <Route path="/" element={<PublicRoute />}>
                <Route path="/" element={<Shop />} />
                <Route path="/auth/:type?" element={<Auth />} />
                <Route path="/products" element={<Shop />} />
                <Route path="/unauthorized" element={<UnauthorizedPage />} />
                <Route path="*" element={<Navigate to="/403" />} />
                <Route path="/403" element={<PageNotFound />} />
            </Route>

            <Route path="/" element={<PrivateRoute />}>
                <Route path="/order" element={<Order />} />
                <Route path="/cart" element={<Cart />} />
            </Route>

            <Route path="/" element={<AdminRoute />}>
                <Route path="/manage/users" element={<ManageUsers />} />
                <Route path="/manage/products" element={<ManageProducts />} />
            </Route>
        </AppRoutes>
    );
};

export default Routes;
