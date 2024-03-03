import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";

const Pagination = ({ pageCount, onPageChange, rows, page, pages }) => {
  return (
    <div className="flex justify-between px-5 py-2 mt-4 rounded-sm">
      <div>
        Jumlah Baris: <span className="font-bold">{rows}</span> Halaman:{" "}
        <span className="font-bold">{rows ? page + 1 : 0}</span> dari{" "}
        <span className="font-bold">{pages}</span>
      </div>
      <nav className="" role="navigation" aria-label="pagination">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          onPageChange={onPageChange}
          containerClassName={"flex items-center h-8 -space-x-px text-sm"}
          pageLinkClassName={
            "flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          }
          previousLinkClassName={
            "flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          }
          nextLinkClassName={
            "flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
          }
          activeLinkClassName={
            "z-10 flex items-center justify-center h-8 px-3 leading-tight border text-primary-600 border-primary-300 bg-primary-50 hover:bg-primary-100 hover:text-primary-700 "
          }
          disabledLinkClassName={"pagination-link is-disabled"}
        />
      </nav>
    </div>
  );
};

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  rows: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
};

export default Pagination;
