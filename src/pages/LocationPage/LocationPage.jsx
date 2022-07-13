import React, { useEffect, useState } from 'react'
import { useQueryParams } from '../../hooks/useQueryParams'
import { useDispatch, useSelector } from 'react-redux';
import './LocationPage.scss'
import { getApiResource } from '../../utils/network';
import NextButton from '../../components/CharactersPage/NextButton/NextButton'
import PrevButton from '../../components/CharactersPage/PrevButton/PrevButton'
import axios from 'axios';

export default function LocationPage() {
  const dispatch = useDispatch();
  const query = useQueryParams();
  const queryPage = query.get('page');
  // Заведём стейт для счётчика страниц
  const [counterPage, setCounterPage] = useState(1);
  // Заведём стейт для предыдущей страницы
  const [prevPage, setPrevPage] = useState(null);
  // Заведём стейт для следующей страницы
  const [nextPage, setNextPage] = useState(null);
  // Добавим лоадер
  const [loading, setLoading] = useState(true);
  // Достаём список локаций из Redux
  const listOfLocations = useSelector((store) => store.locations);

  // Обрабатываем ответ с API по пагинации и записываем в стейты
  const getResponse = async (url) => {
    const res = await getApiResource(url);
    if (res) {
      const { results, info } = res.data;
      dispatch({ type: 'SET_ALL_LOCATIONS', payload: results }) // Записываем в Redux
      setNextPage(info.next);
      setPrevPage(info.prev);
      setCounterPage(queryPage);
    }
  };

  // Получаем список персонажей с API
  useEffect(() => {
    getResponse(`https://rickandmortyapi.com/api/location?page=${queryPage}`);
    setLoading(false);
  }, [queryPage]);

  // Хэндлер на отправку запроса к следующим 20 записям с API
  const handleChangeNext = () => getResponse(nextPage);

  // Хэндлер на отправку запроса к следующим 20 записям с API
  const handleChangePrev = () => getResponse(prevPage);

  return (
    <div className="location-page__wrapper">

      <div className='prev-next-buttons'>
        <PrevButton
          handleChangePrev={handleChangePrev}
          prevPage={prevPage}
          counterPage={counterPage}
          path={'location'}
        />
        <NextButton
          handleChangeNext={handleChangeNext}
          nextPage={nextPage}
          counterPage={counterPage}
          path={'location'}
        />
      </div>
      {loading
        ? <div className="spinner"></div>
        : <div className="location-page__cards">
          {listOfLocations.map(elem => {
            return (
              <div className="card" key={elem.id}>
                <div className="card__inner">
                  <div className="card-text">
                    <h3 className="text-title">Name: {elem.name}</h3>
                    <h3 className="text-title">Dimension: {elem.dimension}</h3>
                    <h3 className="text-title">Type: {elem.type}</h3>
                  </div>
                </div>
              </div>
            )
          })
          }
        </div>
      }
    </div >


  )
}
