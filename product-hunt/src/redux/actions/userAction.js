import {
    SET_USER,
    LOADING_UI,
    SET_AUTHENTICATED,
    LOADING_USER,
  } from '../types';
  import firebase from "firebase/app";
  //import 'firebase/auth';
  //import 'firebase/firestore';
  import axios from 'axios';

  firebase.initializeApp({
    apiKey: "AIzaSyC2DJbqAGmbqLEYykOa64xOASXrgFo1bNg",
    authDomain: "product-hunt-clone-e7b44.firebaseapp.com",
    projectId: "product-hunt-clone-e7b44"
  });

  export const firebaseObject= firebase;
  
  export const loginUser = () => (dispatch) => {
    dispatch({ type: LOADING_UI });
    firebase.auth().onAuthStateChanged(user => {
      dispatch({
        type: SET_AUTHENTICATED ,
      payload: !!user}); 

      if(user){
        createUserDocument(user);
      }
    });
    

    
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

  const createUserDocument = async(userAuth) =>{
    const userRef = firebase.firestore().doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();

    if(!snapshot.exists){
      const {displayName, email, photoURL} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          photoURL,
          createdAt
        })
      }catch(err){
        console.log(err);
      }
    }

    //return userRef;
  }
  