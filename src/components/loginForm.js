import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { login } from "../services/authService";
import { Redirect } from "react-router-dom";
class LoginForm extends Form {
  state = {
    user: {},
    data: { username: "", password: "" },
    errors: {},
  };
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label(" Password"),
  };

  doSubmit = async () => {
    //call the server
    try {
      const { data } = this.state;
      const { data: values } = await login(data.username, data.password);
      console.log("token", values.token);
      localStorage.setItem("token", values.token);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        console.log("errorMessage", ex.response.data.message);
        const errors = { ...this.state.errors };
        errors.username = ex.response.data.message;
        this.setState({ errors });
      }
    }
  };

  render() {
    // if (localStorage.getItem("token")) return <Redirect to="/" />;
    return (
      <div className="container">
        <h1>Log In</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
