import React from "react";

function Select({ name, label, options, error, ...rest }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select {...rest} id={name} name={name} className="form-control">
        <option value="" />
        {options.map((o) => {
          return (
            <option key={o._id} value={o._id}>
              {o.name}
            </option>
          );
        })}
      </select>
      {error && <p className="alert alert-danger">{error}</p>}
    </div>
  );
}

export default Select;
