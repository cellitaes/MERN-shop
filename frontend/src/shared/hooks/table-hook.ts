import { useCallback } from 'react';
import { MRT_Row, MRT_TableInstance } from 'material-react-table';

import { BACKEND_URL } from '../../config';
import { useHttpClient } from './http-hook';
import { getDataByType } from '../util/table/funtions';

import { tableObjects } from '../../models/enums/tableObjectsEnum';
import { AnyData } from '../../interfaces/AnyData';

export const useTable = ({
    data,
    pagination,
    type,
    rowCount,
    setData,
}: {
    data: any;
    pagination: { pageIndex: number; pageSize: number };
    type: tableObjects;
    rowCount: any;
    setData: (data: any[]) => void;
}) => {
    const { sendRequest, error } = useHttpClient();

    const getData = useCallback(
        async (pagination: { pageIndex: number; pageSize: number }) => {
            const fetchData = getDataByType[type];
            const fetchedData = await fetchData(sendRequest, pagination);

            setData(fetchedData?.[type] ?? []);

            rowCount.current = fetchedData?.dataLength;
        },
        [rowCount, type, sendRequest, setData]
    );

    const editRow = async ({
        values,
        table,
        row,
        areFieldsInvalid,
    }: {
        values: AnyData;
        table: MRT_TableInstance<AnyData>;
        row: MRT_Row<AnyData>;
        areFieldsInvalid: boolean;
    }) => {
        if (areFieldsInvalid) return;

        values._id = row.original._id;

        const url = `${BACKEND_URL}/api/${type}`;
        const method = 'PATCH';
        const body = JSON.stringify(values);

        await sendRequest(url, method, body);
        if (error) return;

        const dataCopy = [...data];
        dataCopy[row.index] = values;
        setData(dataCopy);
        table.setEditingRow(null);
    };

    const createData = async ({
        values,
        table,
        areFieldsInvalid,
    }: {
        values: AnyData;
        table: MRT_TableInstance<AnyData>;
        areFieldsInvalid: boolean;
    }) => {
        if (areFieldsInvalid) return;

        const url = `${BACKEND_URL}/api/${type}`;
        const method = 'POST';
        const body = JSON.stringify(values);

        await sendRequest(url, method, body);
        if (error) return;

        await getData(pagination);
        table.setCreatingRow(null);
    };

    const deleteData = async (row: MRT_Row<AnyData>, type: tableObjects) => {
        if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
            const url = `${BACKEND_URL}/api/${type}/${row.original._id}`;
            const method = 'DELETE';
            await sendRequest(url, method);
        }
    };

    const deleteMany = async (
        table: MRT_TableInstance<AnyData>,
        type: tableObjects
    ) => {
        if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
            const selectedProductsToDelete = table
                .getSelectedRowModel()
                .flatRows.map((row) => row.original._id);

            const url = `${BACKEND_URL}/api/${type}`;
            const method = 'DELETE';
            const body = JSON.stringify({ selectedProductsToDelete });
            await sendRequest(url, method, body);
            table.toggleAllRowsSelected(false);
        }
    };

    return { getData, createData, editRow, deleteData, deleteMany };
};
