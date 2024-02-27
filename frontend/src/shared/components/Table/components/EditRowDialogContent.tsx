import { FC } from 'react';
import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import {
    MRT_EditActionButtons as MRTEditActionButtons,
    MRT_Row,
    MRT_TableInstance,
} from 'material-react-table';
import { AnyData } from '../../../../interfaces/AnyData';

type EditRowDialogContentProps = {
    table: MRT_TableInstance<AnyData>;
    row: MRT_Row<AnyData>;
    internalEditComponents: React.ReactNode[];
};

const EditRowDialogContent: FC<EditRowDialogContentProps> = ({
    internalEditComponents,
    table,
    row,
}) => {
    return (
        <>
            <DialogTitle variant="h3">Edit Data</DialogTitle>
            <DialogContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                }}
            >
                {internalEditComponents}
            </DialogContent>
            <DialogActions>
                <MRTEditActionButtons variant="text" table={table} row={row} />
            </DialogActions>
        </>
    );
};

export default EditRowDialogContent;
