import { ReactPaginateProps } from 'react-paginate';

export interface PageChangeEvent extends ReactPaginateProps {
    selected: number;
}
