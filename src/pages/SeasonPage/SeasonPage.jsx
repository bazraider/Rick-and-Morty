import React, { useEffect } from 'react'
import './SeasonPage.scss'
import '../CharactersPage/CharactersPage'
// import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getApiResource } from '../../utils/network';
import { Link, useLocation } from 'react-router-dom';
import { BackButton } from '../../components/CharactersPage/BackButton/BackButton'

// import episodes_img from '../../static/episodes.jpg'

export default function SeasonPage() {
  const dispatch = useDispatch();
  // Вычисляю номер сезона из строки браузера
  const pageNumber = useLocation().pathname.at(-1);

  // Достаём список персонажей из Redux
  const listOfEpisodes = useSelector((store) => store.episodes);

  // Заведу объект с перечнем сезон - серии
  const listOfseries = {
    '1': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // Перечень серий 1ого сезона
    '2': [12, 13, 14, 15, 16, 17, 18, 19, 20, 21], // Перечень серий 2ого сезона
    '3': [22, 23, 24, 25, 26, 27, 28, 29, 30, 31], // Перечень серий 3ого сезона
    '4': [32, 33, 34, 35, 36, 37, 38, 39, 40, 41], // Перечень серий 4ого сезона
    '5': [42, 43, 44, 45, 46, 47, 48, 49, 50, 51], // Перечень серий 5ого сезона
  }

  // Сравниваю совпадение номера страницы с ключом из listOfseries
  const getNumbersOfSeries = (obj) => {
    for (let key in obj) {
      if (key === pageNumber) {
        return obj[key]
      }
    }
  }

  // Обрабатываем ответ с API по пагинации и записываем в стейты
  const getResponse = async (url) => {
    const res = await getApiResource(url);
    console.log(res.data);
    if (res) {
      dispatch({ type: 'SET_ALL_EPISODES_FROM_THIS_SEASON', payload: res.data }) // Записываем в Redux
    }
  };

  // Получаем список персонажей с API по конкретному сезону
  useEffect(() => {
    getResponse(`https://rickandmortyapi.com/api/episode/${getNumbersOfSeries(listOfseries)}`);
  }, []);

  return (
    <>
      <h1>Список серий сезона №{pageNumber}</h1>
      <BackButton />
      <div className="episodes__list">

        <table class="table-fill">
          <thead>
            <tr>
              <th class="text-left">Номер серии</th>
              <th class="text-left">Название</th>
              <th class="text-left">Дата выхода</th>
            </tr>
          </thead>
          <tbody class="table-hover">
            {listOfEpisodes.map(elem => {
              return (
                // <Link to={`/seasons/episode/${pageNumber}/${elem.id}`} key={elem.id}>
                <tr>
                  <td class="text-left">{elem.id}</td>
                  <td class="text-left">{elem.name}</td>
                  <td class="text-left">{elem.air_date}</td>
                </tr>
                // </Link>
              )
            })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}
