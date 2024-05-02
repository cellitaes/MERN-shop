import { useEffect } from 'react';
import { Formik, Form, Field, FormikProps } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Button from '../../../shared/components/FormElements/Button';
import Cart from '../../cart/pages/Cart';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import Input from '../../../shared/components/FormElements/Input';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';

import { getTotalPrice } from '../../../shared/util/functions/cart';

import { BACKEND_URL } from '../../../config';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { ButtonType } from '../../../models/enums/buttonTypeEnum';
import { cartActions } from '../../../store/slices/cartSlice';
import { RootState } from '../../../store/store';
import OrderSchema from '../../../shared/util/yupSchema/orderSchema';

const formFields = [
    {
        name: 'email',
        label: 'email',
        type: 'text',
    },
    {
        name: 'name',
        label: 'name',
        type: 'text',
    },
    {
        name: 'surname',
        label: 'surname',
        type: 'text',
    },
    {
        name: 'postalCode',
        label: 'postal code',
        type: 'text',
    },
    {
        name: 'city',
        label: 'city',
        type: 'text',
    },
];

export interface OrderValues {
    email: string;
    name: string;
    surname: string;
    postalCode: string;
    city: string;
}

export type FieldProps = {
    name: string;
    value: string;
    onChange: () => void;
    onBlur: () => void;
};

const initState = {
    email: '',
    name: '',
    surname: '',
    postalCode: '',
    city: '',
};

const Order = () => {
    const cartItems = useSelector((store: RootState) => store.cart.items);
    const dispatch = useDispatch();

    const { isLoading, error, clearError, sendRequest } = useHttpClient();

    const navigate = useNavigate();

    const totalPrice = getTotalPrice(cartItems);

    useEffect(() => {
        if (!cartItems.length) navigate('/products');
    }, [cartItems.length, navigate]);

    const hasValue = (value: string) => value !== '';

    const handleFormSubmit = async (formValues: OrderValues) => {
        const method = 'POST';
        const body = JSON.stringify({ ...formValues, totalPrice });

        await sendRequest(
            `${BACKEND_URL}/api/orders/place-order`,
            method,
            body
        );

        if (!error) {
            dispatch(cartActions.clearCart());
            navigate('/products');
        }
    };

    if (!cartItems.length) return;

    return (
        <>
            {error && <ErrorModal error={error} onClear={clearError} />}
            {isLoading && <LoadingSpinner asOverlay />}
            <div className="order">
                <div className="order-form">
                    <Formik
                        initialValues={initState}
                        enableReinitialize={true}
                        validationSchema={OrderSchema}
                        onSubmit={(values) => {
                            handleFormSubmit(values);
                        }}
                    >
                        {(props: FormikProps<OrderValues>) => {
                            const everyItemHasValue = Object.values(
                                props.values
                            ).every(hasValue);
                            return (
                                <Form>
                                    {formFields.map((formField) => (
                                        <Field
                                            key={formField.name}
                                            name={formField.name}
                                        >
                                            {({
                                                field,
                                                form: { touched, errors },
                                            }: {
                                                field: FieldProps;
                                                form: FormikProps<OrderValues>;
                                            }) => (
                                                <Input
                                                    formField={formField}
                                                    touched={touched}
                                                    errors={errors}
                                                    field={field}
                                                />
                                            )}
                                        </Field>
                                    ))}

                                    <div>
                                        <Button
                                            disabled={
                                                !everyItemHasValue ||
                                                !props.isValid
                                            }
                                            type={ButtonType.submit}
                                            data-cy="place-order-btn"
                                        >
                                            Place order
                                        </Button>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
                <div className="cart-wrapper">
                    <Cart orderView={true} />
                </div>
            </div>
        </>
    );
};

export default Order;
