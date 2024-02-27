import { FC } from 'react';
import { Button } from '@mui/material';
import { MRT_TableInstance } from 'material-react-table';

import { AnyData } from '../../../../interfaces/AnyData';

type TopToolbarCustomActionsProps = {
    table: MRT_TableInstance<AnyData>;
    handleDeleteMultiple: () => Promise<void>;
};

const TopToolbarCustomActions: FC<TopToolbarCustomActionsProps> = ({
    table,
    handleDeleteMultiple,
}) => {
    return (
        <div
            style={{
                display: 'flex',
                gap: '0.5rem',
            }}
        >
            <Button
                color="error"
                disabled={table.getSelectedRowModel().flatRows.length === 0}
                onClick={handleDeleteMultiple}
                variant="contained"
            >
                Delete
            </Button>
            <Button
                variant="contained"
                onClick={() => {
                    table.setCreatingRow(true);
                }}
            >
                Create New Data
            </Button>
        </div>
    );
};

export default TopToolbarCustomActions;
