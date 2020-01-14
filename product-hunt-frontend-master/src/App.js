import React from 'react';
import {Switch,Route } from 'react-router-dom';
import axios from 'axios';

//redux
import {Provider} from 'react-redux';
import store from './redux/store';


import './App.css';
import HomePage from './components/homepage/homepage.component';
import Header from './components/header/header.component';
import Post from './components/post/post.component';

//`
axios.defaults.baseURL = "https://us-central1-product-hunt-clone-e7b44.cloudfunctions.net/api";
function App() {
  return (
    <Provider store={store}>
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={ HomePage}/>
          <Route exact path='/posts/new' component={Post}/>
        </Switch>
      
      </div>
    </Provider> 
  );
}

export default App;
