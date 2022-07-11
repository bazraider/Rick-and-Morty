import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Header from '../Header/Header';
import './App.scss';
import routesConfig from '../../routes/routesConfig';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        {routesConfig.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;
