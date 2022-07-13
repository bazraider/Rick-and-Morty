import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getApiResource } from '../../utils/network';
import { BackButton } from '../../components/CharactersPage/BackButton/BackButton'
import './PersonPage.scss'

export default function PersonPage() {
  const { id } = useParams();
  // Заведём стейт для информации про персонажа
  const [personInfo, setPersonInfo] = useState(null);
  // Добавим лоадер
  const [loading, setLoading] = useState(true);

  // Получаем конкретного персонажа с API с использованием id из useParams
  useEffect(() => {
    setTimeout(() => {
      const getDataFunc = (async () => {
        const info = await getApiResource(`https://rickandmortyapi.com/api/character/${id}`);
        const { data } = info;
        setPersonInfo(data);
        setLoading(false);
      })()
        .catch(console.error);
    }, 1000);
  }, []);

  // Динамическая смена цвета индикатора жизни
  const getColor = (status) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return '#00ff75'
      case 'dead':
        return '#ff4800'
      case 'unknown':
        return '#939393'
      default:
        return '#939393'
    }
  }

  // Отображаем спинер если идёт загрузка
  return (
    <>
      <BackButton />
      {loading
        ? (<div className="spinner"></div>)
        : <div className="card__outer">
          <div className="card__inner">
            <img src={personInfo.image} alt="img of characters" />
            <div className="card__inner__text">
              <h1>{personInfo.name}</h1>
              <div className="person__status">
                <div className="indicator" style={{ backgroundColor: getColor(personInfo.status) }}></div>
                <h3>{personInfo.status} - {personInfo.species} - {personInfo.gender}</h3>
              </div>
              <div className="person__location">
                <h4>Last known location:</h4>
                <h3>{personInfo.location.name}</h3>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}
