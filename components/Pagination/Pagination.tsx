import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';


interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: ({ selected }: { selected: number }) => void;  
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
  containerClassName?: string;
  activeClassName?: string;
  nextLabel?: string;
  previousLabel?: string;
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange, 
  pageRangeDisplayed = 5,
  marginPagesDisplayed = 1,
  containerClassName,
  activeClassName,
  nextLabel = '→',
  previousLabel = '←',
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}  
      pageRangeDisplayed={pageRangeDisplayed}  
      marginPagesDisplayed={marginPagesDisplayed}  
      onPageChange={onPageChange}  
      forcePage={currentPage - 1}  
      containerClassName={containerClassName || css.pagination}  
      activeClassName={activeClassName || css.active}  
      nextLabel={nextLabel}  
      previousLabel={previousLabel}  
    />
  );
}
