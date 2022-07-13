import IndexPage from '../pages/IndexPage/IndexPage';
import EpisodePage from '../pages/EpisodePage/EpisodePage';
import React from 'react';
import CharactersPage from '../pages/CharactersPage/CharactersPage';
import PersonPage from '../pages/PersonPage/PersonPage';
import SeasonChoosePage from '../pages/SeasonChoosePage/SeasonChoosePage';
import LocationPage from '../pages/LocationPage/LocationPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import SeasonPage from '../pages/SeasonPage/SeasonPage';

const routesConfig = [
  {
    path: '/',
    element: <IndexPage />
  },
  {
    path: '/characters',
    element: <CharactersPage />
  },
  {
    path: '/characters/:id',
    element: <PersonPage />
  },
  {
    path: '/seasons',
    element: <SeasonChoosePage />
  },
  {
    path: '/seasons/:num',
    element: <SeasonPage />
  },
  {
    path: '/seasons/:num/episode/:id',
    element: <EpisodePage />
  },
  {
    path: '/location',
    element: <LocationPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  },
];

export default routesConfig;