import React from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';

import Test from './components/Courses'

export default () => (
  <BrowserRouter>
    <Route path="/" component={Test} />
  </BrowserRouter>
);