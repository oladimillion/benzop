import axios from "axios";
import SetAuthToken from "../auth-token";
import  { USER } from "./types";

const API = "http://localhost:8000";

export function SetCurrentUser(data){ 
  // saving user's data in the store
  return { 
    type: USER,
    payload: data
  }
}

export function Logout(){
  return dispatch => {
    // removing token from local storage
    localStorage.removeItem('token');
    // removing token to request headers
    SetAuthToken();
  }
}

export function LoginRequest(data){ 
  return dispatch => { 
    // making log in request to server
    return axios.post(API + "/api/v1/signin", data)
      .then(data => {
        SetAuthToken(data.token);
        return data;
      })
  }
}

export function RegRequest(data){ 
  return dispatch => { 
    // making registration request to server
    return axios.post(API + "/api/v1/signup", data)
  }
}

export function AddFileRequest(data){ 
  return dispatch => { 
    // making registration request to server
    return axios.post(API + "/api/v1/add-file", data)
  }
}

export function RemoveFileRequest(data){ 
  return dispatch => { 
    // making registration request to server
    return axios.put(API + "/api/v1/remove-file", data)
  }
}

export function UndoRemoveFileRequest(data){ 
  return dispatch => { 
    // making registration request to server
    return axios.put(API + "/api/v1/undo-remove-file", data)
  }
}

export function RetrieveFilesRequest(){ 
  return dispatch => { 
    // making registration request to server
    return axios.get(API + "/api/v1/retrieve-files")
  }
}
