import IndexPage from '../pages/IndexPage/IndexPage';
import SeriesListPage from '../pages/SeriesListPage/SeriesListPage';
import React from 'react';
import CharactersPage from '../pages/CharactersPage/CharactersPage';
import EpisodesPage from '../pages/EpisodesPage/EpisodesPage';
import LocationPage from '../pages/LocationPage/LocationPage';

const routesConfig = [
  {
    path: '/',
    element: <IndexPage />
  },
  {
    path: '/serial',
    element: <SeriesListPage />
  },
  {
    path: '/characters',
    element: <CharactersPage />
  },
  {
    path: '/episodes',
    element: <EpisodesPage />
  },
  {
    path: '/location',
    element: <LocationPage />
  },
];

export default routesConfig;