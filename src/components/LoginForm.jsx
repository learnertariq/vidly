import React from "react";
import Joi from "joi";
import { toast } from "react-toastify";

import authService from "../auth/authService";
import Form from "./common/Form";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schemaObj = {
    username: Joi.string().min(5).max(32).required().label("Username"),
    password: Joi.string().min(3).required().label("Password"),
  };
  schema = Joi.object().keys(this.schemaObj);

  doSubmit = async () => {
    try {
      await authService.login(this.state.data);
      const { state } = this.props.location;

      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) toast(ex.response.data);
    }
  };

  render() {
    return (
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
