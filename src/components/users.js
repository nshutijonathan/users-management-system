import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import { getUsers, addUsers, deleteUser } from "../services/userService";

class Users extends Component {
  state = {
    users: [],
    newUser: {},
    decodedUser: {},
  };
  async componentDidMount() {
    try {
      // let token = localStorage.getItem("token");
      // console.log("lllllll", token);
      // if (!token) {
      //   window.location = "/login";
      // }
      const jwt = localStorage.getItem("token");
      const decodedUser = jwtDecode(jwt);
      const response = await getUsers();
      this.setState({ users: response.data.data, decodedUser });
      // console.log("users", this.state.users[0]["is_admin"]);
    } catch (error) {
      console.log("error", error);
    }
  }
  handleDelete = async (user) => {
    try {
      // console.log("user", user.id);
      const response = await deleteUser(user);
      const users = [...this.state.users];
      const filtered = users.filter((u) => u.id != user.id);
      this.setState({
        users: filtered,
      });
    } catch (error) {
      return error.message;
    }
  };

  render() {
    const { user: loggedInUser } = this.props;
    console.log("this");
    // console.log("token", jwtDecode(localStorage.getItem("token")));
    return (
      <React.Fragment>
        {loggedInUser && (
          <div className="container">
            <h2>Users</h2>
            {this.state.decodedUser.is_admin === true && (
              <button className="btn btn-primary">Add</button>
            )}

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">name</th>
                  <th scope="col">email</th>
                  <th scope="col">is_admin</th>
                  <th scope="col">createdAt</th>
                </tr>
              </thead>

              <tbody>
                {this.state.users.map((user) => (
                  <tr key={user.id}>
                    <th scope="row">{user.id}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {typeof user.is_admin == "boolean"
                        ? typeof user.is_admin
                        : "null"}
                    </td>
                    <td>{user.createdAt}</td>
                    <td>
                      {this.state.decodedUser.is_admin === true && (
                        <button type="button" className="btn btn-info">
                          Update
                        </button>
                      )}
                    </td>
                    <td>
                      {this.state.decodedUser.is_admin === true && (
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => this.handleDelete(user)}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Users;
