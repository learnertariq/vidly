import React from "react";

function TableHeader({ columns, onSort, sortColumn }) {
  const raiseSort = (path) => {
    const newSortColumn = { ...sortColumn };
    if (newSortColumn.path === path) {
      newSortColumn.order = newSortColumn.order === "asc" ? "desc" : "asc";
    } else {
      newSortColumn.path = path;
      newSortColumn.order = "asc";
    }

    onSort(newSortColumn);
  };

  const getSortIcon = (column) => {
    if (column["path"] === undefined || column.path !== sortColumn.path)
      return null;

    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            className="pointer"
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label} {getSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
