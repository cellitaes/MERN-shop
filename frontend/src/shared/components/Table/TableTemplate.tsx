import { FC, useEffect, useState, useRef } from 'react';
import {
    MaterialReactTable,
    MRT_ColumnDef,
    useMaterialReactTable,
    MRT_Row,
    MRT_TableInstance,
    MRT_RowData,
    MRT_DensityState,
    MRT_TableOptions,
} from 'material-react-table';
import _ from 'lodash';

import CreateRowDialogContent from './components/CreateRowDialogContent';

import { tableObjects } from '../../../models/enums/tableObjectsEnum';
import { useTable } from '../../hooks/table-hook';
import { AnyData } from '../../../interfaces/AnyData';
import EditRowDialogContent from './components/EditRowDialogContent';
import RowActions from './components/RowActions';
import TopToolbarCustomActions from './components/TopToolbarCustomActions';

type TableTemplateProps<T extends MRT_RowData> = {
    data: T[];
    columns: MRT_ColumnDef<T>[];
    isLoading: boolean;
    type: tableObjects;
    validationErrors: Record<string, string | undefined>;
    setData: (data: any[]) => void;
};

const TableTemplate: FC<TableTemplateProps<AnyData>> = ({
    data,
    columns,
    isLoading,
    type,
    validationErrors,
    setData,
}) => {
    const [density, setDensity] = useState<MRT_DensityState>('compact');
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 25,
    });

    const rowCount = useRef<number | undefined>(undefined);

    const { getData, createData, editRow, deleteData, deleteMany } = useTable({
        data,
        pagination,
        type,
        rowCount,
        setData,
    });

    useEffect(() => {
        getData(pagination);
    }, [getData, pagination]);

    const contentTable = document.querySelector('.table-container')!;
    const tableToolbar = document.querySelector('.upperToolbar')!;
    const bottomToolbar = document.querySelector('.bottomToolbar')!;

    const areFieldsInvalid = Object.values(validationErrors).some(
        (val) => !!val
    );

    const handleRowEditingSave: MRT_TableOptions<AnyData>['onEditingRowSave'] =
        async ({
            values,
            table,
            row,
        }: {
            values: AnyData;
            table: MRT_TableInstance<AnyData>;
            row: MRT_Row<AnyData>;
        }) => {
            await editRow({ values, table, row, areFieldsInvalid });
        };

    const handleRowDeletion = async (row: MRT_Row<AnyData>) => {
        await deleteData(row, type);
        await getData(pagination);
    };

    const handleCreateUser: MRT_TableOptions<AnyData>['onCreatingRowSave'] =
        async ({ values, table }) => {
            await createData({
                values,
                table,
                areFieldsInvalid,
            });
        };

    const handlePaginationChange = (onChange: any) => {
        const newPagination = onChange(pagination);
        if (_.isEqual(newPagination, pagination)) return;

        setPagination(newPagination);
    };

    const table = useMaterialReactTable({
        columns,
        data,
        enableColumnFilterModes: true,
        enableColumnOrdering: true,
        enableColumnPinning: true,
        enableRowActions: true,
        enableRowSelection: true,
        enableEditing: true,
        enableTopToolbar: true,
        enablePagination: true,
        enableStickyHeader: true,
        enableStickyFooter: true,
        enableGrouping: true,
        enablePinning: true,
        enableSorting: true,
        enableColumnResizing: true,
        manualPagination: true,
        createDisplayMode: 'modal',
        editDisplayMode: 'modal',
        memoMode: 'cells',
        positionToolbarAlertBanner: undefined,
        paginationDisplayMode: 'pages',
        layoutMode: 'grid',
        positionPagination: 'bottom',

        rowCount: rowCount.current,

        onCreatingRowSave: handleCreateUser,
        onEditingRowSave: handleRowEditingSave,
        onDensityChange: setDensity,
        onPaginationChange: handlePaginationChange,

        state: {
            isLoading,
            showProgressBars: isLoading,
            density,
            pagination,
        },

        muiPaginationProps: {
            rowsPerPageOptions: [25, 50, 75, 100, 150],
        },

        muiTopToolbarProps: {
            className: 'upperToolbar',
        },

        muiBottomToolbarProps: {
            className: 'bottomToolbar',
        },

        muiTablePaperProps: {
            className: 'test',
            sx: {},
        },

        muiTableContainerProps: {
            sx: {
                maxHeight:
                    contentTable?.clientHeight -
                    tableToolbar?.clientHeight -
                    bottomToolbar?.clientHeight,
            },
        },

        displayColumnDefOptions: {
            'mrt-row-actions': {
                columnDefType: 'data',
                enableHiding: true,
                enableResizing: true,
                enableColumnOrdering: true,
                muiTableHeadCellProps: {
                    align: 'center',
                },
                size: 80,
            },
        },

        renderCreateRowDialogContent: ({
            table,
            row,
            internalEditComponents,
        }) => (
            <CreateRowDialogContent
                internalEditComponents={internalEditComponents}
                table={table}
                row={row}
            />
        ),

        renderEditRowDialogContent: ({
            table,
            row,
            internalEditComponents,
        }) => (
            <EditRowDialogContent
                internalEditComponents={internalEditComponents}
                table={table}
                row={row}
            />
        ),

        renderRowActions: ({ row, table }) => (
            <RowActions
                table={table}
                row={row}
                handleRowDeletion={handleRowDeletion}
            />
        ),

        renderTopToolbarCustomActions: ({ table }) => {
            const handleDeleteMultiple = async () => {
                await deleteMany(table, type);
                await getData(pagination);
            };

            return (
                <TopToolbarCustomActions
                    table={table}
                    handleDeleteMultiple={handleDeleteMultiple}
                />
            );
        },
    });

    return <MaterialReactTable table={table} />;
};

export default TableTemplate;
