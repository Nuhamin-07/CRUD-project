import { takeEvery, call, put } from "redux-saga/effects";
import {
  SET_USERS,
  GET_USERS,
  GET_USERS_STARTED,
  GET_USERS_FAILED,
  PUT_USER,
  POST_USER,
  DELETE_USER,
  CANCEL_USER_UPDATE,
  EDIT_USER,
  SET_EDIT_MODE
} from "../actions";
import Axios from "axios";

export const watchGetUsers = function*() {
  yield takeEvery(GET_USERS, workerGetUsers);
};

export const watchPostUser = function*() {
  yield takeEvery(POST_USER, workerPostUser);
};

export const watchPutUser = function*() {
  yield takeEvery(PUT_USER, workerPutUser);
};

export const watchDeleteUser = function*() {
  yield takeEvery(DELETE_USER, workerDeleteUser);
};

export const watchEditUser = function*() {
  yield takeEvery(EDIT_USER, workerEditUser);
};

export const watchCancelUserUpdate = function*() {
  yield takeEvery(CANCEL_USER_UPDATE, workerCancelUserUpdate);
};

function* workerGetUsers() {
  console.log("get users");
  try {
    const uri = "https://localhost:8000/findall";
    const result = yield call(Axios.get, uri);
    yield put({ type: SET_USERS, value: result.data });
  } catch {
    console.log("failed");
  }
}

function* workerPostUser(action) {
  console.log("adding user");
  try {
    const uri = "https://localhost:8000/create";
    const result = yield call(Axios.post, uri, action.value);
    yield put({ type: GET_USERS });
    console.log("new user added");
  } catch {
    console.log("register failed");
  }
}

function* workerPutUser(action) {
  console.log("updating a user");
  try {
    const uri = "https://localhost:8000/update";
    const result = yield call(Axios.put, uri, action.value);
    yield put({ type: GET_USERS });
    console.log("updated successfully");
  } catch {
    console.log("updating failed");
  }
}

function* workerDeleteUser() {
  console.log("user deleted");
  try {
    const uri = "https://localhost:8000/delete";
    const result = yield call(Axios.delete, uri);
    yield put({ type: GET_USERS });
    console.loglog("deleted successfull");
  } catch {
    console.log("failed to delete user");
  }
}

function* workerEditUser(action) {
  console.log("editing a user", action);
  yield put({
    type: SET_EDIT_MODE,
    value: { userId: action.value, editMode: true }
  });
}

function* workerCancelUserUpdate(action) {
  console.log("canceled user update");
  yield put({
    type: SET_EDIT_MODE,
    value: { userId: action.value, editMode: false }
  });
}
