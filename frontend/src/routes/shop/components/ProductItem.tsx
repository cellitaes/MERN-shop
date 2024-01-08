import { FC } from 'react';
import { useDispatch } from 'react-redux';

import Card from '../../../shared/components/UIElements/Card';
import { Product } from '../../../interfaces/Product';
import Button from '../../../shared/components/FormElements/Button';

import { BACKEND_URL } from '../../../config';
import { Size } from '../../../models/enums/sizeEnum';
import { cartActions } from '../../../store/slices/cartSlice';

const ProductItem: FC<Product> = ({
    _id,
    name,
    price,
    description,
    image,
    category,
}) => {
    const dispatch = useDispatch();

    const addProductToCart = () => {
        dispatch(
            cartActions.addToCart({
                _id,
                name,
                price,
                description,
                image,
                category,
            })
        );
    };

    return (
        <li className={'item'} id={_id}>
            <Card>
                <header>
                    <div>
                        <h3>{name}</h3>
                        <h6>{category?.name}</h6>
                    </div>
                    <div className={'price'}>${price.toFixed(2)}</div>
                </header>
                <div className="product-image">
                    <img alt={description} src={`${BACKEND_URL}/${image}`} />
                </div>
                <p className="description">{description}</p>
                <div className={'actions'}>
                    <Button size={Size.small} onClick={addProductToCart}>
                        Add to Cart
                    </Button>
                </div>
            </Card>
        </li>
    );
};

export default ProductItem;
