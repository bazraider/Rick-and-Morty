import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './CharactersPage.scss'
import { getApiResource } from '../../utils/network';
import { useQueryParams } from '../../hooks/useQueryParams'

export default function CharactersPage() {
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);

  const dispatch = useDispatch();
  const listOfCharacters = useSelector((store) => store.characters); // Достаём список персонажей из Redux
  const query = useQueryParams();
  const queryPage = query.get('page');

  const getResponse = async (url) => {
    const res = await getApiResource(url);
    if (res) {
      const { results, info } = res.data;
      console.log(results); // --------------------------------------------------------------------> TODO - Удалить
      dispatch({ type: 'SET_ALL_CHARACTERS', payload: results }) // Записываем в Redux
      setNextPage(info.next);
      setPrevPage(info.prev);
      // setCounterPage(getPeoplePageId(url));
    }
  };

  // Получаем список персонажей с API
  useEffect(() => {
    getResponse(`https://rickandmortyapi.com/api/character/?page=${queryPage}`);
  }, [queryPage]);

  const handleChangeNext = () => getResponse(nextPage);
  const handleChangePrev = () => getResponse(prevPage);

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
      {/* <div className='prev-next-buttons'>
        <Link to={`/people/?page=${counterPage - 1}`} className='buttons'>
          <button
            text="Previous"
            onClick={handleChangePrev}
            disabled={!prevPage}
          />
        </Link>
        <Link to={`/people/?page=${counterPage + 1}`} className='buttons'>
          <button
            text="Next"
            onClick={handleChangeNext}
            disabled={!nextPage}
          />
        </Link>
      </div> */}
      <div className="character-page__cards">
        {listOfCharacters &&
          listOfCharacters.map(elem => {
            return (
              <div className="card" key={elem.id}>
                <div className="card__inner">
                  <img src={elem.image} className="card-img" />
                  <div className="card-text">
                    <p className="text-title">{elem.name}</p>
                  </div>

                </div>
                <Link to='#'>
                  <button className="card-button">Подробнее</button>
                </Link>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
