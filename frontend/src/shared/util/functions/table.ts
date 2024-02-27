import { BACKEND_URL } from '../../../config';
import { tableObjects } from '../../../models/enums/tableObjectsEnum';

export const getRequestUrl = (objectType: tableObjects) => {
    switch (objectType) {
        case tableObjects.products:
            return `${BACKEND_URL}/api/products/`;
        case tableObjects.users:
            return `${BACKEND_URL}/api/users/`;
        default:
            return `${BACKEND_URL}/`;
    }
};
