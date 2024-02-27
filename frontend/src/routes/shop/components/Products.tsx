import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { BACKEND_URL } from '../../../config';

import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import ProductItem from './ProductItem';

import { useHttpClient } from '../../../shared/hooks/http-hook';
import { rowsPerPage } from '../../../constants/pagination';

import { Product } from '../../../interfaces/Product';
import { Category } from '../../../interfaces/Category';
import ReactPaginate from 'react-paginate';
import { PageChangeEvent } from '../../../interfaces/Pagination';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import { getNewSearchParams } from '../../../shared/util/functions/searchParams';

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const productsCount = useRef(0);

    const { isLoading, error, clearError, sendRequest } = useHttpClient();

    useEffect(() => {
        const getProducts = async () => {
            const res = await sendRequest(
                `${BACKEND_URL}/api/products?category=${searchParams.get(
                    'category'
                )}&skip=${
                    +(searchParams.get('page') ?? 0) * rowsPerPage
                }&limit=${rowsPerPage}`
            );

            productsCount.current = res?.dataLength;
            setProducts(res?.products);
        };
        getProducts();
    }, [sendRequest, searchParams]);

    useEffect(() => {
        const getCategories = async () => {
            const res = await sendRequest(`${BACKEND_URL}/api/categories`);
            setCategories(res?.categories);
        };
        getCategories();
    }, [sendRequest]);

    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value: category } = e.target;

        const newSearchParams = getNewSearchParams(
            getNewSearchParams(searchParams, category, 'category'),
            0,
            'page'
        );

        setSearchParams(newSearchParams);
    };

    const handlePageChange = (e: PageChangeEvent) => {
        const page = e.selected;
        const newSearchParams = getNewSearchParams(searchParams, page, 'page');

        setSearchParams(newSearchParams);
    };

    return (
        <>
            {error && <ErrorModal error={error} onClear={clearError} />}
            <section className={'products'}>
                <div className="products-header">
                    <h2>Buy your favorite products</h2>
                    {!!categories && (
                        <select
                            name="categories"
                            id="categories"
                            onChange={handleCategoryChange}
                        >
                            <option value="">-</option>
                            {categories.map((category) => (
                                <option
                                    key={category._id}
                                    value={category.name}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
                <ReactPaginate
                    className="products-pagination"
                    breakLabel="..."
                    nextLabel={'next >'}
                    onPageChange={handlePageChange}
                    pageRangeDisplayed={1}
                    pageCount={Math.ceil(productsCount.current / rowsPerPage)}
                    forcePage={+searchParams.get('page')! ?? 0}
                    previousLabel={'< prev'}
                    renderOnZeroPageCount={null}
                />
                {!isLoading && !!products && !!categories ? (
                    <ul className="products-list">
                        {products.map(
                            ({
                                name,
                                description,
                                price,
                                _id,
                                image,
                                category,
                            }) => (
                                <ProductItem
                                    key={_id}
                                    _id={_id}
                                    name={name}
                                    price={price}
                                    description={description}
                                    image={image}
                                    category={category}
                                />
                            )
                        )}
                    </ul>
                ) : (
                    <div className="spinner-container">
                        <span className="spinner-container__text">
                            Loading ...
                        </span>
                        <LoadingSpinner />
                    </div>
                )}
            </section>
        </>
    );
};

export default Products;
