import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './CharactersPage.scss'
import { getApiResource } from '../../utils/network';
import { useQueryParams } from '../../hooks/useQueryParams'
import NextButton from '../../components/CharactersPage/NextButton/NextButton'
import PrevButton from '../../components/CharactersPage/PrevButton/PrevButton'

export default function CharactersPage() {
  const dispatch = useDispatch();
  // Заведём стейт для ввода инпута
  const [inputSearchValue, setInputSearchValue] = useState({ characterInput: '' });
  // Заведём стейт для счётчика страниц
  const [counterPage, setCounterPage] = useState(1);
  // Заведём стейт для предыдущей страницы
  const [prevPage, setPrevPage] = useState(null);
  // Заведём стейт для следующей страницы
  const [nextPage, setNextPage] = useState(null);
  // Достаём список персонажей из Redux
  const listOfCharacters = useSelector((store) => store.characters);
  // Достаём отфильтрованный список персонажей из Redux
  const filteredlistOfCharacters = useSelector((store) => store.filtered_characters);
  // Получаем номер текущей страницы из браузера
  const query = useQueryParams();
  const queryPage = query.get('page');

  console.log('prevPage', prevPage);
  console.log('nextPage', nextPage);

  // Обрабатываем ответ с API по пагинации и записываем в стейты
  const getResponse = async (url) => {
    const res = await getApiResource(url);
    if (res) {
      const { results, info } = res.data;
      dispatch({ type: 'SET_ALL_CHARACTERS', payload: results }) // Записываем в Redux
      setNextPage(info.next);
      setPrevPage(info.prev);
      setCounterPage(queryPage);
    }
  };

  // Обрабатываем ответ с API по поиску персонажа и записываем в стейты
  const getFilterResponse = async (url) => {
    const res = await getApiResource(url);
    if (res) {
      console.log(res);
      const { results, info } = res.data;
      dispatch({ type: 'LIST_OF_FILTERED_CHARACTERS', payload: results }) // Записываем в Redux отфильтрованных персонажей
      setNextPage(info.next);
      setPrevPage(info.prev);
    }
  }

  // Получаем список персонажей с API
  useEffect(() => {
    getResponse(`https://rickandmortyapi.com/api/character/?page=${queryPage}`);
  }, [queryPage]);

  // Хэндлер на отправку запроса к следующим 20 записям с API
  const handleChangeNext = () => getResponse(nextPage);

  // Хэндлер на отправку запроса к следующим 20 записям с API
  const handleChangePrev = () => getResponse(prevPage);

  const handleInputChange = (event) => {
    setInputSearchValue({ ...inputSearchValue, [event.target.name]: event.target.value })
    // Очищаем стейт фильтрованных персонажей если в поисковой строке пусто. Если нет, то кидаем запрос на API
    if (event.target.value.length) {
      getFilterResponse(`https://rickandmortyapi.com/api/character/?name=${event.target.value}`)
    } else dispatch({ type: 'LIST_OF_FILTERED_CHARACTERS', payload: [] })
  }

  // Если список с отфильтрованными персонажами не пустой то выводим их, если пустой то выводим всех
  return (
    <div className="character-page__wrapper">
      <div className="search">
        <input
          onChange={handleInputChange}
          type="text"
          name='characterInput'
          className="search__input"
          placeholder="Введите имя персонажа..."
        />
        <button className="search__button">
          <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
        </button>
      </div>

      <div className='prev-next-buttons'>
        <PrevButton
          handleChangePrev={handleChangePrev}
          prevPage={prevPage}
          counterPage={counterPage} />
        <NextButton
          handleChangeNext={handleChangeNext}
          nextPage={nextPage}
          counterPage={counterPage} />
      </div>

      {(filteredlistOfCharacters.length > 0)
        ? <div className="character-page__cards">
          {filteredlistOfCharacters.map(elem => {
            return (
              <div className="card" key={elem.id}>
                <div className="card__inner">
                  <img src={elem.image} className="card-img" />
                  <div className="card-text">
                    <p className="text-title">{elem.name}</p>
                  </div>

                </div>
                <Link to={`/characters/${elem.id}`}>
                  <button className="card-button">Подробнее</button>
                </Link>
              </div>
            )
          })
          }
        </div>
        : <div className="character-page__cards">
          {listOfCharacters.map(elem => {
            return (
              <div className="card" key={elem.id}>
                <div className="card__inner">
                  <img src={elem.image} className="card-img" />
                  <div className="card-text">
                    <p className="text-title">{elem.name}</p>
                  </div>

                </div>
                <Link to={`/characters/${elem.id}`}>
                  <button className="card-button">Подробнее</button>
                </Link>
              </div>
            )
          })
          }
        </div>
      }
    </div >
  )
}
