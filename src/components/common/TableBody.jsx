import React from "react";
import _ from "lodash";

function TableBody({
  columns,
  data,
  textProperty = "",
  valueProperty = "_id",
}) {
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  const getKey = (item, column) =>
    item[valueProperty] + (column.path || column.key);

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item[valueProperty]}>
          {columns.map((column) => (
            <td key={getKey(item, column)}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
