import { BACKEND_URL } from '../../../config';

import { Product } from '../../../interfaces/Product';
import { tableObjects } from '../../../models/enums/tableObjectsEnum';

const getProducts = async (
    sendRequest: (
        url: string,
        method?: string,
        body?: any,
        headers?: any
    ) => Promise<any>,
    pagination: {
        pageIndex: number;
        pageSize: number;
    }
) => {
    const { pageIndex, pageSize } = pagination;
    const skip = pageIndex * pageSize;

    const url = `${BACKEND_URL}/api/products?skip=${skip}&limit=${pageSize}`;
    const res = await sendRequest(url);

    if (!res?.products) return;

    const products = res.products.map((prod: Product) => ({
        ...prod,
        category: prod.category.name,
    }));
    res.products = products;

    return res;
};

const getUsers = async (
    sendRequest: (
        url: string,
        method?: string,
        body?: any,
        headers?: any
    ) => Promise<any>,
    pagination: {
        pageIndex: number;
        pageSize: number;
    }
) => {
    const { pageIndex, pageSize } = pagination;
    const skip = pageIndex * pageSize;

    const url = `${BACKEND_URL}/api/users?skip=${skip}&limit=${pageSize}`;
    const res = await sendRequest(url);

    if (!res?.users) return;

    return res;
};

export const getDataByType = {
    [tableObjects.products]: getProducts,
    [tableObjects.users]: getUsers,
};
