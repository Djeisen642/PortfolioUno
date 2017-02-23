require('./scss/main.scss');
import React from 'react';
import { render } from 'react-dom';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
import App from './components/App.js';
import BlogPage from './components/BlogPage.js';
import ProjectsPage from './components/ProjectsPage.js';
import ResumePage from './components/ResumePage.js';
import ContactPage from './components/ContactPage.js';
import { Router, Route, hashHistory } from 'react-router'
// import reducer from './reducers';

// const store = createStore(reducer);

render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/home" component={App}/>
      <Route path="/blog" component={BlogPage}/>
      <Route path="/projects" component={ProjectsPage}/>
      <Route path="/resume" component={ResumePage}/>
      <Route path="/contact" component={ContactPage}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
