import * as React from "react";
import Axios from "axios";
import { connect } from "react-redux";
import {
  GET_USERS,
  PUT_USER,
  POST_USER,
  DELETE_USER,
  CANCEL_USER_UPDATE,
  EDIT_USER
} from "./actions";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    this.props.getUsers();
  }
  render() {
    return (
      <div className="container">
        <div className="row mb-4">
          <div className="col-2">
            {/* <label>ID: </label> */}
            <input
              type="number"
              id="userId"
              placeholder="user id"
              onChange={event => this.inputChanged(event, "userId")}
            />
          </div>
          {/* <br /> */}
          <div className="col-2">
            {/* <label for="name">Full Name: </label> */}
            <input
              type="text"
              placeholder="Full Name"
              id="name"
              name="name"
              onChange={event => this.inputChanged(event, "name")}
            />
          </div>
          {/* <br /> */}
          <div className="col-2">
            {/* <label for="dateOfBirth">Date of Birth: </label> */}
            <input
              type="date"
              placeholder="Date of birth"
              name="birthDate"
              id="dateOfBirth"
              onChange={event => this.inputChanged(event, "dateOfBirth")}
            />
          </div>
          {/* <br /> */}
          <div className="col-2">
            {/* <label for="gender">Gender:</label> */}
            <select
              name="gender"
              id="gender"
              onChange={event => this.inputChanged(event, "gender")}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          {/* <br /> */}
          <div className="col-2">
            {/* <label for="salary">Salary: </label> */}
            <input
              type="number"
              placeholder="Salary"
              id="salary"
              id="salary"
              onChange={event => this.inputChanged(event, "salary")}
            />
          </div>
          {/* <br /> */}
          <div className="col-2">
            <button type="submit" onClick={this.addUser}>
              Submit
            </button>
          </div>
        </div>
        {(this.props.users || []).map(user => {
          return (
            <div>
              <div className="col-2">{user.id}</div>
              <div className="col-2">{user.name}</div>
              <div className="col-2">{user.dateOfBirth}</div>
              <div className="col-2">{user.gender}</div>
              <div className="col-2">{user.salary}</div>
              <div className="col-2">
                {user.editMode ? (
                  <>
                    <button
                      className="col-2"
                      onClick={() => {
                        this.updateUser(user);
                      }}
                    >
                      Update
                    </button>

                    <button
                      className=""
                      onClick={() => {
                        this.cancelUpdate(user);
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className=""
                      onClick={() => {
                        this.editUser(user);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className=""
                      onClick={() => {
                        this.deleteUser(user);
                      }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  inputChanged = (event, field) => {
    this.setState({ [field]: event.target.value });
  };
  addUser = () => {
    this.props.addUser({
      id: this.state.id,
      name: this.state.name,
      dateOfBirth: this.state.dateOfBirth,
      gender: this.state.gender,
      salary: this.state.salary
    });
  };
  deleteUser = user => {
    this.UNSAFE_componentWillMount.props.deleteUser(user.id);
  };

  editUser = user => {
    this.props.editUser(user.id);
  };

  updateUser = user => {
    this.props.updateUser(user);
  };

  cancelUpdate = user => {
    this.props.cancelUpdate(user.id);
  };
}
const mapStateToProps = state => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => {
      dispatch({ type: GET_USERS });
    },
    addUser: user => {
      dispatch({ type: POST_USER, value: user });
    },
    deleteUser: userId => {
      dispatch({ type: DELETE_USER, value: userId });
    },
    editUser: userId => {
      dispatch({ type: EDIT_USER, value: userId });
    },
    updateUser: user => {
      console.log("update", user);
      dispatch({ type: PUT_USER, value: user });
    },
    cancelUpdate: userId => {
      dispatch({ type: CANCEL_USER_UPDATE, value: userId });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
