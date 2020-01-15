import {
    SET_PRODUCTS,
    UPVOTE_PRODUCT,
    LOADING_DATA,
    SET_PRODUCT,
    SUBMIT_COMMENT
  } from '../types';
  
  const initialState = {
    products: [],
    product: {},
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case LOADING_DATA:
        return {
          ...state,
          loading: true
        };
      case SET_PRODUCTS:
        return {
          ...state,
          products: action.payload,
          loading: false
        };
      case SET_PRODUCT:
        return {
          ...state,
          product: action.payload
        };
      case UPVOTE_PRODUCT:
        let index = state.products.findIndex(
          (product) => product.productId === action.payload.productId
        );
        state.products[index] = action.payload;
        if (state.product.productId === action.payload.productId) {
          state.product = action.payload;
        }
        return {
          ...state
        };
      case SUBMIT_COMMENT:
        return {
          ...state,
          product: {
            ...state.product,
            comments: [action.payload, ...state.product.comments]
          }
        };
      default:
        return state;
    }
  }
  