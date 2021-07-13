import React from "react";

function ListGroup({
  items,
  textProperty = "name",
  valueProperty = "_id",
  onItemSelect,
  selectedItem,
}) {
  const getItemClasses = (item) => {
    const classes = "list-group-item pointer";
    return item[textProperty] === selectedItem[textProperty]
      ? classes + " active"
      : classes;
  };
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[valueProperty] || item.key}
          className={getItemClasses(item)}
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
}

export default ListGroup;
