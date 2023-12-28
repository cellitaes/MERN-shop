import { Routes as AppRoutes, Route } from 'react-router-dom';

import Cart from './routes/cart/pages/Cart';
import Shop from './routes/shop/pages/Shop';
import PageNotFound from './routes/pageNotFound/pages/PageNotFound';
import Order from './routes/order/pages/Order';

const Routes = () => {
    return (
        <AppRoutes>
            <Route path="/" element={<Shop />} />
            <Route path="/products" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />
            <Route path="*" element={<PageNotFound />} />
        </AppRoutes>
    );
};

export default Routes;
