import {
    SET_USER,
    LOADING_UI,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
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
    firebase.auth().onAuthStateChanged( async user => {
      dispatch({
        type: SET_AUTHENTICATED ,
        payload: !!user}); 

      if(user){
        const userRef= await createUserDocument(user);
        userRef.onSnapshot(snapshot => {
          dispatch({ type: LOADING_USER });
          const votes = [];
          firebase.firestore().collection('votes')
            .where('userId', '==', snapshot.id)
            .get()
            .then((data) => {
              data.forEach((doc) => {
                votes.push(doc.data());
              });
              dispatch({
                type: SET_USER,
                payload: { currentUser: { userId: snapshot.id, ...snapshot.data() }, votes: votes }
              });
            });
          
        })
      }
      else{
        dispatch({
          type: SET_UNAUTHENTICATED});
      }
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

    return userRef;
  }

  /*const getVotesOfUser= async (userId) => {
    const votes=[];
    firebase.firestore().collection('votes')
    .where('userId', '==', userId)
    .get()
    .then((data) => {
        data.forEach((doc) =>{
          console.log(doc.data());
          votes.push(doc.data());
        })
    });
    console.log(votes);
    return votes
  }*/
  