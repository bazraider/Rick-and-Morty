import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
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
  // Заведём стейт для счётчика страниц отфильтрованных персонажей
  const [counterFilteredPage, setCounterFilteredPage] = useState(1);
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
  // Проверка на то что в строке браузера есть парметр name (это значит что в строке поиска что-то вбито)
  const filterIncludeInPath = query.get('name')

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
    console.log(res);
    if (res) {
      const { results, info } = res.data;
      dispatch({ type: 'LIST_OF_FILTERED_CHARACTERS', payload: results }) // Записываем в Redux отфильтрованных персонажей
      setNextPage(info.next);
      setPrevPage(info.prev);
      setCounterFilteredPage(queryPage);
    }
  }

  // Получаем список персонажей с API
  useEffect(() => {
    if (!filterIncludeInPath) {
      getResponse(`https://rickandmortyapi.com/api/character/?page=${queryPage}`);
    } else {
      getFilterResponse(`https://rickandmortyapi.com/api/character/?page=${counterFilteredPage}&name=${inputSearchValue.characterInput}`);
    }
  }, [queryPage, counterFilteredPage]);

  // Хэндлер на отправку запроса к следующим 20 записям с API
  const handleChangeNext = () => {
    if (!filterIncludeInPath) {
      getResponse(nextPage);
    } else {
      getFilterResponse(nextPage);
    }
  }

  // Хэндлер на отправку запроса к следующим 20 записям с API
  const handleChangePrev = () => {
    if (!filterIncludeInPath) {
      getResponse(prevPage);
    } else {
      getFilterResponse(prevPage);
    }
  }

  // Хэндлер на отлавливание ввода в инпут
  const handleInputChange = (event) => {
    setInputSearchValue({ ...inputSearchValue, [event.target.name]: event.target.value })
    // Очищаем стейт фильтрованных персонажей если в поисковой строке пусто. Если нет, то кидаем запрос на API
    if (event.target.value.length) {
      getFilterResponse(`https://rickandmortyapi.com/api/character/?name=${event.target.value}`)
    } else dispatch({ type: 'LIST_OF_FILTERED_CHARACTERS', payload: [] })
  }

  // Функция для определения путей для кнопок НАЗАД и ВПЕРЕД
  const getPath = () => {
    if (inputSearchValue.characterInput.length) {
      return `&name=${inputSearchValue.characterInput}`
    } else return ''
  }

  // Функция для определения счётчиков ---> без фильтра или с фильтром
  const getCounter = () => {
    if (!filterIncludeInPath) {
      return counterPage;
    } else return counterFilteredPage;
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
      </div>

      <div className='prev-next-buttons'>
        <PrevButton
          handleChangePrev={handleChangePrev}
          prevPage={prevPage}
          counterPage={getCounter()}
          path={{ 'firstParam': 'characters/', 'secondParam': getPath() }}
        />
        <NextButton
          handleChangeNext={handleChangeNext}
          nextPage={nextPage}
          counterPage={getCounter()}
          path={{ 'firstParam': 'characters/', 'secondParam': getPath() }}
        />
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
