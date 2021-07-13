import React, { Component } from "react";
import Input from "./Input";
import Joi from "joi";
import Select from "./Select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = this.schema.validate(this.state.data, options);
    if (!error) return null;

    const joiErrors = {};
    error.details.map((e) => (joiErrors[e.path[0]] = e.message));
    return joiErrors;
  };

  validateChange = ({ name, value }) => {
    const subSchema = Joi.object().keys({ [name]: this.schemaObj[name] });
    const { error } = subSchema.validate({ [name]: value });

    const joiErrors = { ...this.state.errors };
    if (error) joiErrors[name] = error.details[0].message;
    else delete joiErrors[name];

    return joiErrors;
  };

  handleChange = ({ target: input }) => {
    this.setState({ errors: this.validateChange(input) });

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  renderInput = (name, label, type = "text") => {
    return (
      <Input
        error={this.state.errors[name]}
        label={label}
        name={name}
        onChange={this.handleChange}
        type={type}
        value={this.state.data[name]}
      />
    );
  };

  renderSelect = (name, label, options) => {
    return (
      <Select
        error={this.state.errors[name]}
        name={name}
        onChange={this.handleChange}
        label={label}
        options={options}
        value={this.state.data[name]}
      />
    );
  };

  renderButton = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };
}

export default Form;
