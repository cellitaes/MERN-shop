import { FC } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { MRT_Row, MRT_TableInstance } from 'material-react-table';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { AnyData } from '../../../../interfaces/AnyData';

type RowActionsProps = {
    table: MRT_TableInstance<AnyData>;
    row: MRT_Row<AnyData>;
    handleRowDeletion: (row: MRT_Row<AnyData>) => Promise<void>;
};

const RowActions: FC<RowActionsProps> = ({ table, row, handleRowDeletion }) => {
    return (
        <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip title="Edit">
                <IconButton onClick={() => table.setEditingRow(row)}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
                <IconButton
                    color="error"
                    onClick={() => handleRowDeletion(row)}
                >
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default RowActions;
