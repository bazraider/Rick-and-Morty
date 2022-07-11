import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from "./components/App/App";

const mountNode = ReactDOM.createRoot(document.getElementById('root'));
mountNode.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);