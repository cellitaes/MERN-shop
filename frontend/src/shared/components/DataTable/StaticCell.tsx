import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';

type StaticTableCellProps = {
    children: ReactNode;
};

const StaticTableCell: FC<StaticTableCellProps> = ({ children }) => {
    return <Box className="staticTableCell">{children}</Box>;
};

export default StaticTableCell;
