import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import './index.css';
import {MuiThemeProvider} from "@material-ui/core";
import {theme} from "./theme";

ReactDOM.render(
  <React.StrictMode>
      <MuiThemeProvider theme={theme}>
    <App />
      </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
