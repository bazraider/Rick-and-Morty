import IndexPage from '../pages/IndexPage/IndexPage';
import SeriesListPage from '../pages/SeriesListPage/SeriesListPage';
import React from 'react';

const routesConfig = [
  {
    path: '/',
    element: <IndexPage />
  },
  {
    path: '/serial',
    element: <SeriesListPage />
  },
];

export default routesConfig;