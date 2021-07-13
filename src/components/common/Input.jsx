import React from "react";
import PropTypes from "prop-types";

function Input({ error, label, name, onChange, value }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        className="form-control"
        id={name}
        name={name}
        onChange={onChange}
        value={value}
      />
      {error && <p className="alert alert-danger">{error}</p>}
    </div>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Input;
