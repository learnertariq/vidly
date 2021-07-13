import React from "react";

import Counter from "./Counter";

function Counters({ counters, onDelete, onDecrement, onIncrement, onReset }) {
  return (
    <div>
      <button className="btn btn-primary btn-sm m-2" onClick={onReset}>
        Reset
      </button>
      {counters &&
        counters.map((counter) => (
          <Counter
            key={counter.id}
            counter={counter}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onDelete={onDelete}
          />
        ))}
    </div>
  );
}

export default Counters;
