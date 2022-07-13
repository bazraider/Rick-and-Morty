import React, { useEffect, useState } from 'react'
import './EpisodePage.scss'
import { Link, useParams } from 'react-router-dom';
import { getApiResource } from '../../utils/network';
import { BackButton } from '../../components/CharactersPage/BackButton/BackButton'

export default function EpisodePage() {
  const { id } = useParams();
  // Заведём стейт для информации по эпизоду
  const [episodeInfo, setEpisodeInfo] = useState([]);
  // Добавим лоадер
  const [loading, setLoading] = useState(true);
  const [listOfCharactersFromSeries, setListOfCharactersFromSeries] = useState([]);
  const { air_date, episode, name } = episodeInfo;

  // Получаем конкретный эпизод с API с использованием id из useParams
  useEffect(() => {
    setTimeout(() => {
      const getDataFunc = (async () => {
        const info = await getApiResource(`https://rickandmortyapi.com/api/episode/${id}`);
        const { data } = info;
        setEpisodeInfo(data);
        // Запишем всех персонажей с этой серии в стейт
        const everyPersonOfSeries = await Promise.all(
          data.characters.map((person) => {
            return fetch(person).then((res) => res.json());
          })
        );
        setListOfCharactersFromSeries(everyPersonOfSeries);
        setLoading(false);
      })()
        .catch(console.error);
    }, 1000);
  }, []);

  // Отображаем спинер если идёт загрузка
  return (
    <>
      <BackButton />
      {loading
        ? <div className="spinner"></div>
        : <div className="episode__wrapper">
          <div className="series-info__container">
            <div className="series-info__inner">
              <h1>{episode}</h1>
              <h1>
                Episode name :{" "}
                <span>{name === "" ? "Unknown" : name}</span>
              </h1>
              <h5>
                Air Date: {air_date === "" ? "Unknown" : air_date}
              </h5>
            </div>
          </div>

          <div className="character-page__cards">
            {listOfCharactersFromSeries.map(elem => {
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
        </div>
      }
    </>
  )
}


// loading
// ? (<div className="spinner"></div>)
// : (
//   <>
//     <div className="episode__wrapper">

//       <div className="series-info__container">
//         <div className="series-info__inner">
//           <h1>{episode}</h1>
//           <h1>
//             Episode name :{" "}
//             <span>{name === "" ? "Unknown" : name}</span>
//           </h1>
//           <h5>
//             Air Date: {air_date === "" ? "Unknown" : air_date}
//           </h5>
//         </div>
//       </div>

//       <div className="character-page__cards">
//         {listOfCharactersFromSeries.map(elem => {
//           return (
//             <div className="card" key={elem.id}>
//               <div className="card__inner">
//                 <img src={elem.image} className="card-img" />
//                 <div className="card-text">
//                   <p className="text-title">{elem.name}</p>
//                 </div>

//               </div>
//               <Link to={`/characters/${elem.id}`}>
//                 <button className="card-button">Подробнее</button>
//               </Link>
//             </div>
//           )
//         })
//         }
//       </div>

//     </div>
//   </>)