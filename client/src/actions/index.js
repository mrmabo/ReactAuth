import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3000';

export function signinUser({email, password}) {

  return function(dispatch){
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, {email, password})
      .then(response => {
        // If request is good.. 
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER })
        // - Save the JWT token
        console.log(response.data)
        console.log(response.data.token)
        localStorage.setItem('token', response.data.token);
        // - redirect to the route '/feature'
        browserHistory.push('/feature');
      })
      .catch((error)=>{
        // If request is bad...
        // - Show an error to the user
        console.log(error)
        dispatch(authError('Bad Login Info'));
      })
  }
}

export function authError(error){
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser(){
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  }
}

export function signupUser({email, password}) {

  return function(dispatch){
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signup`, {email, password})
      .then(response => {
        // If request is good.. 
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER })
        // - Save the JWT token
        console.log(response.data)
        console.log(response.data.token)
        localStorage.setItem('token', response.data.token);
        // - redirect to the route '/feature'
        browserHistory.push('/feature');
      })
      .catch((response)=>{
        // If request is bad...
        // - Show an error to the user
        console.log(response.error)
        dispatch(authError(response));
      })
  }
}

export function fetchMessage(){
  return function(dispath){
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        console.log(response)
        dispath({
          type: FETCH_MESSAGE,
          payload: response.data.message
        })
      })
  }
}