import React from 'react'
import './SeasonChoosePage.scss'
import '../CharactersPage/CharactersPage'
import { Link } from 'react-router-dom';
import season1_img from '../../static/season1.jpg'
import season2_img from '../../static/season2.jpg'
import season3_img from '../../static/season3.jpg'
import season4_img from '../../static/season4.jpg'
import season5_img from '../../static/season5.jpg'

export default function EpisodesPage() {

  return (
    <div className="episode-page__wrapper">
      <div className="search">
        <input
          // onChange={handleInputChange}
          type="text"
          name='characterInput'
          className="search__input"
          placeholder="Введите название эпизода..."
        />
        <button className="search__button">
          <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
        </button>
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
    </div >
  )
}
