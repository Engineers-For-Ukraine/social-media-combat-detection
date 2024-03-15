import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
import './index.css';

import App from './App';

//const root = ReactDOM.createRoot(document.getElementById('root'));

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("root")
);