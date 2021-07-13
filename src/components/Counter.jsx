import React from "react";

function Counter({ counter, onDecrement, onIncrement, onDelete }) {
  const formatCount = () => {
    return counter.value === 0 ? "Zero" : counter.value;
  };

  const getCounterStyles = () => {
    const classes = "badge m-2 badge-";
    return counter.value === 0 ? classes + "warning" : classes + "primary";
  };
  return (
    <div className="row">
      <div className="col-1">
        <span className={getCounterStyles()}>{formatCount()}</span>
      </div>
      <div className="col">
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => onIncrement(counter)}
        >
          +
        </button>
        <button
          className="btn btn-secondary btn-sm m-2"
          disabled={counter.value === 0}
          onClick={() => onDecrement(counter)}
        >
          -
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(counter)}
        >
          x
        </button>
      </div>
    </div>
  );
}

export default Counter;
