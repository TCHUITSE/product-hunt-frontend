import {
    SET_USER,
    SET_AUTHENTICATED,
    LOADING_USER,
    UPVOTE_PRODUCT,
    DOWNVOTE_PRODUCT,
    SET_UNAUTHENTICATED,
  } from '../types';
  
  const initialState = {
    authenticated: false,
    loading: false,
    currentUser: {},
    votes: []
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_AUTHENTICATED:
        return {
          ...state,
          authenticated: action.payload
        };
      case SET_UNAUTHENTICATED:
        return initialState;
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
              userHandle: state.currentUser.userHandle,
              userId: state.currentUser.userId,
              productId: action.payload.productId
            }
          ]
      };
      case DOWNVOTE_PRODUCT:
        return {
          ...state,
          votes: state.votes.filter(
            (vote) => vote.productId !== action.payload.productId
          )
        };
      default:
        return state;
    }
  }
  