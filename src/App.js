import React, { Component } from "react";
import { Route, Redirect, Switch, Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "./App.css";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import Users from "./components/users";
import UserForm from "./components/userForm";
import NotFound from "./components/notFound";
class App extends Component {
  state = {};
  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      // if (!jwt) {
      //   this.props.history.push("/login");
      // }

      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (error) {}
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/register" component={RegisterForm}></Route>
            <Route
              path="/users"
              render={(props) => {
                if (!localStorage.getItem("token")) {
                  return <Redirect to="/login" />;
                }
                return <Users {...props} user={user} />;
              }}
            ></Route>
            <Route path="/users/:id" component={UserForm}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}
export default App;
