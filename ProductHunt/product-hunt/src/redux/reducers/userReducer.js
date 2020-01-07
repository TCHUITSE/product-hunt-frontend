import {
    SET_USER,
    SET_AUTHENTICATED,
    LOADING_USER,
    UPVOTE_PRODUCT,
  } from '../types';
  
  const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    votes: []
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_AUTHENTICATED:
        return {
          ...state,
          authenticated: action.payload
        };
      
      case SET_USER:
        return {
          authenticated: true,
          loading: false,
          ...action.payload
        };
      case LOADING_USER:
        return {
          ...state,
          loading: true
        };
      case UPVOTE_PRODUCT:
        return {
          ...state,
          votes: [
            ...state.votes,
            {
              userHandle: state.credentials.handle,
              productId: action.payload.productId
            }
          ]
        };
      default:
        return state;
    }
  }
  