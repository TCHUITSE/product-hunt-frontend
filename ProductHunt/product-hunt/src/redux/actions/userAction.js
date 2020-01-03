import {
    SET_USER,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_AUTHENTICATED,
    LOADING_USER
  } from '../types';
  import firebase from "firebase";
  import axios from 'axios';

  firebase.initializeApp({
    apiKey: "AIzaSyC2DJbqAGmbqLEYykOa64xOASXrgFo1bNg",
    authDomain: "product-hunt-clone-e7b44.firebaseapp.com"
  });

  export const firebaseObject= firebase;
  
  export const loginUser = () => (dispatch) => {
    dispatch({ type: LOADING_UI });
    firebase.auth().onAuthStateChanged(user => {
      dispatch({
        type: SET_AUTHENTICATED ,
      payload: !!user}); 
    })
      dispatch({ type: CLEAR_ERRORS });
  };

  export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    dispatch({
      type: SET_USER,
      payload: firebase.auth().currentUser
    });
  };

  export const getToken =() =>{
    firebase.auth().currentUser
      .getIdToken()
      .then(function (token) {
          setAuthorizationHeader(token);
      });
  };

  const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    axios.defaults.headers.common['Authorization'] = FBIdToken;
  };
  