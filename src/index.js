import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from "./components/App/App";
import { Provider } from 'react-redux';
import { store } from './redux/store';

const mountNode = ReactDOM.createRoot(document.getElementById('root'));
mountNode.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);