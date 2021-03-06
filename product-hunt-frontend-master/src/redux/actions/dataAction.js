import {
    SET_PRODUCTS,
    LOADING_DATA,
    UPVOTE_PRODUCT,
    DOWNVOTE_PRODUCT,
    LOADING_UI,
    SET_PRODUCT,
    STOP_LOADING_UI,
    SUBMIT_COMMENT
  } from '../types';
  import axios from 'axios';
  
  // Get all products
  export const getProducts = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get('/products')
      .then((res) => {
        dispatch({
          type: SET_PRODUCTS,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_PRODUCTS,
          payload: []
        });
      });
  };

  //get one product
  export const getProduct = (productId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .get(`/products/${productId}`)
      .then((res) => {
        dispatch({
          type: SET_PRODUCT,
          payload: res.data
        });
        dispatch({ type: STOP_LOADING_UI });
      })
      .catch((err) => console.log(err));
  };
  
  // Upvote a product
  export const upvoteProduct = (productId, upvoteData) => (dispatch) => {
    axios
      .post(`/products/${productId}/upvote`, upvoteData)
      .then((res) => {
        dispatch({
          type: UPVOTE_PRODUCT,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };

  //downvote a product
  export const downvoteProduct = (productId, downvoteData) => (dispatch) => {
    axios
      .post(`/products/${productId}/downvote`, downvoteData)
      .then((res) => {
        dispatch({
          type: DOWNVOTE_PRODUCT,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };

  // Submit a comment
  export const submitComment = (productId, commentData) => (dispatch) => {
    axios
      .post(`/products/${productId}/comment`, commentData)
      .then((res) => {
        dispatch({
          type: SUBMIT_COMMENT,
          payload: res.data
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  
  /*export const getUserData = (userHandle) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get(`/user/${userHandle}`)
      .then((res) => {
        dispatch({
          type: SET_PRODUCTS,
          payload: res.data.screams
        });
      })
      .catch(() => {
        dispatch({
          type: SET_PRODUCTS,
          payload: null
        });
      });
  };*/
  
  
  