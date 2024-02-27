import { useEffect, useMemo, useState } from 'react';
import { Box, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';

import TableTemplate from '../../../shared/components/Table/TableTemplate';
import StaticTableCell from '../../../shared/components/DataTable/StaticCell';

import { BACKEND_URL } from '../../../config';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { useTableValidation } from '../../../shared/hooks/table-validation';

import { Product } from '../../../interfaces/Product';
import { tableObjects } from '../../../models/enums/tableObjectsEnum';
import { Category } from '../../../interfaces/Category';
import { VALIDATOR_TYPES } from '../../../shared/util/table/fieldValidators';

type AnyData = {
    [key: string]: any;
};

const validators = {
    image: {
        validators: [{ type: VALIDATOR_TYPES.REQUIRE }],
    },
    name: {
        validators: [
            { type: VALIDATOR_TYPES.REQUIRE },
            { type: VALIDATOR_TYPES.MINLENGTH, minLength: 5 },
        ],
    },
    price: {
        validators: [
            { type: VALIDATOR_TYPES.REQUIRE },
            { type: VALIDATOR_TYPES.IS_NUMBER },
        ],
    },
    description: {
        validators: [
            { type: VALIDATOR_TYPES.REQUIRE },
            { type: VALIDATOR_TYPES.MINLENGTH, minLength: 10 },
        ],
    },
    category: {
        validators: [{ type: VALIDATOR_TYPES.REQUIRE }],
    },
};

const ManageProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const { validationErrors, validateFieldChange } =
        useTableValidation(validators);
    const { isLoading, sendRequest } = useHttpClient();

    useEffect(() => {
        const getImages = async () => {
            const url = `${BACKEND_URL}/api/pictures`;
            const res = await sendRequest(url);

            if (!res) return;
            setImages(res);
        };
        getImages();
    }, [sendRequest]);

    useEffect(() => {
        const getCategories = async () => {
            const res = await sendRequest(`${BACKEND_URL}/api/categories`);
            setCategories(res?.categories);
        };
        getCategories();
    }, [sendRequest]);

    const columns = useMemo<MRT_ColumnDef<AnyData>[]>(
        () => [
            {
                accessorKey: 'image',
                header: 'Image',
                enableGrouping: false,
                enableColumnActions: false,
                enableSorting: false,
                size: 40,
                Cell: ({ row }) => (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                        }}
                    >
                        <img
                            alt="product"
                            height={30}
                            src={`${BACKEND_URL}/${row.original.image}`}
                            loading="lazy"
                            style={{ borderRadius: '50%' }}
                        />
                    </Box>
                ),
                muiEditTextFieldProps: () => ({
                    children: images.map((image) => (
                        <MenuItem key={image} value={`uploads/images/${image}`}>
                            <ListItemIcon>
                                <img
                                    alt="product"
                                    height={30}
                                    src={`${BACKEND_URL}/uploads/images/${image}`}
                                    loading="lazy"
                                    style={{ borderRadius: '50%' }}
                                />
                            </ListItemIcon>
                            <ListItemText>{image}</ListItemText>
                        </MenuItem>
                    )),
                    select: true,
                    required: true,
                    error: !!validationErrors?.image,
                    helperText: validationErrors?.image,
                    onChange: (e) => validateFieldChange(e, 'image'),
                }),
            },
            {
                accessorKey: 'name',
                header: 'Name',
                Cell: ({ renderedCellValue }) => (
                    <StaticTableCell>{renderedCellValue}</StaticTableCell>
                ),
                muiEditTextFieldProps: () => ({
                    required: true,
                    error: !!validationErrors?.name,
                    helperText: validationErrors?.name,
                    onChange: (e) => validateFieldChange(e, 'name'),
                }),
            },
            {
                accessorKey: 'price',
                header: 'Price',
                Cell: ({ cell }) => (
                    <Box>
                        {cell.getValue<number>()?.toLocaleString?.('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </Box>
                ),
                muiEditTextFieldProps: () => ({
                    required: true,
                    error: !!validationErrors?.price,
                    helperText: validationErrors?.price,
                    onChange: (e) => validateFieldChange(e, 'price'),
                }),
            },
            {
                accessorKey: 'description',
                header: 'Description',
                Cell: ({ renderedCellValue }) => (
                    <StaticTableCell>{renderedCellValue}</StaticTableCell>
                ),
                muiEditTextFieldProps: () => ({
                    required: true,
                    error: !!validationErrors?.description,
                    helperText: validationErrors?.description,
                    onChange: (e) => validateFieldChange(e, 'description'),
                }),
            },
            {
                accessorKey: 'category',
                header: 'Category',
                Cell: ({ renderedCellValue }) => (
                    <StaticTableCell>{renderedCellValue}</StaticTableCell>
                ),
                muiEditTextFieldProps: () => ({
                    children: categories.map((category) => (
                        <MenuItem key={category._id} value={category.name}>
                            <ListItemText>{category.name}</ListItemText>
                        </MenuItem>
                    )),
                    select: true,
                    required: true,
                    error: !!validationErrors?.category,
                    helperText: validationErrors?.category,
                    onChange: (e) => validateFieldChange(e, 'category'),
                }),
            },
        ],
        [categories, images, validationErrors, validateFieldChange]
    );

    return (
        <div className="table-container">
            <TableTemplate
                data={products}
                columns={columns}
                isLoading={isLoading}
                type={tableObjects.products}
                validationErrors={validationErrors}
                setData={setProducts}
            />
        </div>
    );
};

export default ManageProducts;
