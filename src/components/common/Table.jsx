import React from "react";

import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

function Table({ data, columns, onSort, sortColumn }) {
  return (
    <table className="table">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody columns={columns} data={data} />
    </table>
  );
}

export default Table;
