import { useEffect, useMemo, useState } from 'react';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { BACKEND_URL } from '../../../config';
import TableTemplate from '../../../shared/components/Table/TableTemplate';
import { MRT_ColumnDef } from 'material-react-table';
import { tableObjects } from '../../../models/enums/tableObjectsEnum';
import { AnyData } from '../../../interfaces/AnyData';
import StaticTableCell from '../../../shared/components/DataTable/StaticCell';
import { useTableValidation } from '../../../shared/hooks/table-validation';
import { VALIDATOR_TYPES } from '../../../shared/util/table/fieldValidators';

export type User = {
    email: string;
    name: string;
    surname: string;
};

const validators = {
    email: {
        validators: [
            { type: VALIDATOR_TYPES.REQUIRE },
            { type: VALIDATOR_TYPES.EMAIL },
        ],
    },
    name: {
        validators: [
            { type: VALIDATOR_TYPES.REQUIRE },
            { type: VALIDATOR_TYPES.MINLENGTH, minLength: 2 },
        ],
    },
    surname: {
        validators: [
            { type: VALIDATOR_TYPES.REQUIRE },
            { type: VALIDATOR_TYPES.MINLENGTH, minLength: 2 },
        ],
    },
};

const ManageUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const { isLoading, sendRequest } = useHttpClient();

    const { validationErrors, validateFieldChange } =
        useTableValidation(validators);

    useEffect(() => {
        const getUsers = async () => {
            const url = `${BACKEND_URL}/api/users`;
            const res = await sendRequest(url);

            if (!res?.users) return;

            setUsers(res.users);
        };
        getUsers();
    }, [sendRequest]);

    const columns = useMemo<MRT_ColumnDef<AnyData>[]>(
        () => [
            {
                accessorKey: 'email',
                header: 'Email',
                Cell: ({ renderedCellValue }) => (
                    <StaticTableCell>{renderedCellValue}</StaticTableCell>
                ),
                muiEditTextFieldProps: () => ({
                    required: true,
                    error: !!validationErrors?.email,
                    helperText: validationErrors?.email,
                    onChange: (e) => validateFieldChange(e, 'email'),
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
                accessorKey: 'surname',
                header: 'Surname',
                Cell: ({ renderedCellValue }) => (
                    <StaticTableCell>{renderedCellValue}</StaticTableCell>
                ),
                muiEditTextFieldProps: () => ({
                    required: true,
                    error: !!validationErrors?.surname,
                    helperText: validationErrors?.surname,
                    onChange: (e) => validateFieldChange(e, 'surname'),
                }),
            },
        ],
        [validateFieldChange, validationErrors]
    );

    return (
        <div className="table-container">
            <TableTemplate
                data={users}
                columns={columns}
                isLoading={isLoading}
                type={tableObjects.users}
                validationErrors={validationErrors}
                setData={setUsers}
            />
        </div>
    );
};

export default ManageUsers;
