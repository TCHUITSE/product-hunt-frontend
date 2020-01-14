import {
    LOADING_UI,
    STOP_LOADING_UI,
    CLEAR_ERRORS
  } from '../types';
  
  const initialState = {
    loading: false,
    errors: null
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case LOADING_UI:
        return {
          ...state,
          loading: true
        };
      case CLEAR_ERRORS:
        return {
            ...state,
            loading:false,
            errors:null
        }
      case STOP_LOADING_UI:
        return {
          ...state,
          loading: false
        };
      default:
        return state;
    }
  }
  