import React from 'react'
import { Link } from 'react-router-dom';
import './IndexPage.scss';
import characters_img from '../../static/characters.jpg'
import episodes_img from '../../static/episodes.jpg'
import location_img from '../../static/location.jpg'

export default function IndexPage() {
  return (
    <div className="chapters__wrapper">
      <h1>Выберите интересующий раздел</h1>
      <div className="chapters__cards">
        <Link to="/characters/?page=1">
          <div className="card__outer">
            <div className="card__inner">
              <img src={characters_img} alt="img of characters" />
              <div className="card__inner__text">
                <h2>Персонажи</h2>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/seasons">
          <div className="card__outer">
            <div className="card__inner">
              <img src={episodes_img} />
              <div className="card__inner__text">
                <h2>Эпизоды</h2>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/location">
          <div className="card__outer">
            <div className="card__inner">
              <img src={location_img} alt="img of location" />
              <div className="card__inner__text">
                <h2>Локации</h2>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
