import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { register, getUsers } from "../services/userService";
class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },
    errors: {},
  };
  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };
  doSubmit = async () => {
    try {
      const response = await register(this.state.data);
      localStorage.setItem("token", response.data.token);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 409) {
        console.log("errorMessage", ex.response.data.message);
        const errors = { ...this.state.errors };
        errors.username = ex.response.data.message;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
