import { Routes as AppRoutes, Route } from 'react-router-dom';

import Auth from './routes/auth/pages/Auth';
import Cart from './routes/cart/pages/Cart';
import Shop from './routes/shop/pages/Shop';
import Order from './routes/order/pages/Order';
import PageNotFound from './routes/errorPages/pages/PageNotFound';
import PrivateRoute from './shared/components/Routes/PrivateRoute';
import PublicRoute from './shared/components/Routes/PublicRoute';
import UnauthorizedPage from './routes/errorPages/pages/UnauthorizedPage';

const Routes = () => {
    return (
        <AppRoutes>
            <Route path="/" element={<PublicRoute />}>
                <Route path="/" element={<Shop />} />
                <Route path="/auth/:type?" element={<Auth />} />
                <Route path="/products" element={<Shop />} />
                <Route path="/unauthorized" component={<UnauthorizedPage />} />
                <Route path="*" element={<PageNotFound />} />
            </Route>

            <Route path="/" element={<PrivateRoute />}>
                <Route path="/order" element={<Order />} />
                <Route path="/cart" element={<Cart />} />
            </Route>
        </AppRoutes>
    );
};

export default Routes;
