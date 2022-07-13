import React from 'react'
import './SeasonChoosePage.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getApiResource } from '../../utils/network';
import season1_img from '../../static/season1.jpg'
import season2_img from '../../static/season2.jpg'
import season3_img from '../../static/season3.jpg'
import season4_img from '../../static/season4.jpg'
import season5_img from '../../static/season5.jpg'

export default function EpisodesPage() {
  const dispatch = useDispatch();
  // Достаём отфильтрованный список персонажей из Redux
  const filteredlistOfEpisodes = useSelector((store) => store.filtered_episodes);

  // Используем useNavigate для перехода на конкретную серию
  const navigate = useNavigate();

  // Создадим хэндлер для навигации к конкретному эпизоду
  const handleRowClick = (id, num) => {
    const pageNumber = num.slice(2, 3)
    navigate(`/seasons/${pageNumber}/episode/${id}`);
  }

  // Обрабатываем ответ с API по поиску персонажа и записываем в стейты
  const getFilterResponse = async (url) => {
    const res = await getApiResource(url);
    if (res) {
      const { results } = res.data;
      dispatch({ type: 'LIST_OF_FILTERED_EPISODES', payload: results }) // Записываем в Redux отфильтрованные эпизоды
    }
  }

  const handleInputChange = (event) => {
    // Очищаем стейт фильтрованных персонажей если в поисковой строке пусто. Если нет, то кидаем запрос на API
    if (event.target.value.length) {
      getFilterResponse(`https://rickandmortyapi.com/api/episode/?name=${event.target.value}`)
    } else dispatch({ type: 'LIST_OF_FILTERED_EPISODES', payload: [] })
  }

  return (
    <div className="episode-page__wrapper">
      <div className="search">
        <input
          onChange={handleInputChange}
          type="text"
          name='episodeInput'
          className="search__input"
          placeholder="Введите название эпизода..."
        />
      </div>

      <div className="episodes__cards">
        <Link to="/seasons/1">
          <div className="card__outer">
            <div className="card__inner">
              <img src={season1_img} alt="img of characters" />
              <div className="card__inner__text">
                <h2>Сезон №1</h2>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/seasons/2">
          <div className="card__outer">
            <div className="card__inner">
              <img src={season2_img} alt="img of characters" />
              <div className="card__inner__text">
                <h2>Сезон №2</h2>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/seasons/3">
          <div className="card__outer">
            <div className="card__inner">
              <img src={season3_img} alt="img of characters" />
              <div className="card__inner__text">
                <h2>Сезон №3</h2>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/seasons/4">
          <div className="card__outer">
            <div className="card__inner">
              <img src={season4_img} alt="img of characters" />
              <div className="card__inner__text">
                <h2>Сезон №4</h2>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/seasons/5">
          <div className="card__outer">
            <div className="card__inner">
              <img src={season5_img} alt="img of characters" />
              <div className="card__inner__text">
                <h2>Сезон №5</h2>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {(filteredlistOfEpisodes.length > 0) &&
        <div className="episodes__search-results">
          <h1>Результаты поиска:</h1>
          <table>
            <thead>
              <tr>
                <th className="text-left">Номер серии</th>
                <th className="text-left">Название</th>
                <th className="text-left">Дата выхода</th>
              </tr>
            </thead>
            <tbody>
              {filteredlistOfEpisodes.map(elem => {
                return (
                  <tr key={elem.id} onClick={() => handleRowClick(elem.id, elem.episode)}>
                    <td className="text-left">{elem.episode}</td>
                    <td className="text-left">{elem.name}</td>
                    <td className="text-left">{elem.air_date}</td>
                  </tr>
                )
              })
              }
            </tbody>
          </table>
        </div>
      }

    </div>
  )
}