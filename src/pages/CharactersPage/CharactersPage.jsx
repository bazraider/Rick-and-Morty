import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './CharactersPage.scss'

export default function CharactersPage() {
  const dispatch = useDispatch();
  const listOfCharacters = useSelector((store) => store.characters); // Достаю список из Redux

  // Получаем список персонажей с API
  useEffect(() => {
    axios
      .get('https://rickandmortyapi.com/api/character')
      .then((data) => {
        const { results } = data.data;
        console.log(results); // --------------------------------------------------------------------> TODO - Удалить
        if (results.length) {
          dispatch({ type: 'SET_ALL_CHARACTERS', payload: results }) // Записываем в Redux
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="character-page__wrapper">
      <div className="search">
        <input type="text" className="search__input" placeholder="Введите имя персонажа..." />
        <button className="search__button">
          <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
        </button>
      </div>
      <div className="character-page__cards">
        {listOfCharacters &&
          listOfCharacters.map(elem => {
            return (
              <div class="card" key={elem.id}>
                <div class="card-details">
                  <p class="text-title">{elem.name}</p>
                  <p class="text-body">Here are the details of the card</p>
                </div>
                <button class="card-button">Подробнее</button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
