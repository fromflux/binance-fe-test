import React from 'react';
import { render } from 'react-dom';

import './theme/reset.css';
import './theme/colors.css';

import Home from './routes/home/home';

render(
  <Home />,
  document.getElementById('root'),
);
