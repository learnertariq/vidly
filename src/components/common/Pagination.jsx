import React from "react";

function Pagination({ itemsCount, currentPage, onPageChange, pageSize }) {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;

  const pages = new Array(pagesCount).fill(undefined);
  const getPageClasses = (index) => {
    const classes = "page-item";
    return currentPage === index + 1 ? classes + " active" : classes;
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page, index) => (
          <li
            key={index.toString()}
            className={getPageClasses(index)}
            onClick={() => onPageChange(index + 1)}
          >
            <button className="page-link">{index + 1}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
