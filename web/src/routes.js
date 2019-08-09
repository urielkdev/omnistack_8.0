import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Main from './pages/Main';
import Login from './pages/Login';

export default () => {
  return (
    <BrowserRouter>
      <Route path="/" component={Login} exact />
      <Route path="/dev/:id" component={Main} exact />
    </BrowserRouter>
  );
}