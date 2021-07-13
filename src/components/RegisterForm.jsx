import React from "react";
import Joi from "joi";

import authService from "../auth/authService";
import Form from "./common/Form";
import { toast } from "react-toastify";

class RegisterForm extends Form {
  state = {
    data: { name: "", username: "", password: "" },
    errors: {},
  };

  schemaObj = {
    name: Joi.string().required(),
    username: Joi.string().min(5).max(32).required().label("Username"),
    password: Joi.string().min(3).required().label("Password"),
  };
  schema = Joi.object().keys(this.schemaObj);

  doSubmit = async () => {
    try {
      await authService.register(this.state.data);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) toast(ex.response.data);
    }
  };

  render() {
    return (
      <div className="container">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("username", "Username", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
