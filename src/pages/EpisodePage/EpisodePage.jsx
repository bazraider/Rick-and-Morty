import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getApiResource } from '../../utils/network';
import { BackButton } from '../../components/CharactersPage/BackButton/BackButton'

export default function EpisodePage() {
  const { id } = useParams();

  // Заведём стейт для информации про персонажа
  const [episodeInfo, setEpisodeInfo] = useState(null);
  // Добавим лоадер
  const [loading, setLoading] = useState(true);

  // Получаем конкретного персонажа с API с использованием id из useParams
  useEffect(() => {
    const getDataFunc = (async () => {
      const info = await getApiResource(`https://rickandmortyapi.com/api/episode/${id}`);
      const { data } = info;
      setEpisodeInfo(data);
      setLoading(false);
    })()
      .catch(console.error);
  }, []);

  // отображаем спинер если идёт загрузка
  return loading
    ? (<div className="spinner"></div>)
    : (
      <>
        <BackButton />
        <div className="person__wrapper">

          <table className="table-fill">
            <thead>
              <tr>
                <th className="text-left">Номер серии</th>
                <th className="text-left">Название</th>
                <th className="text-left">Дата выхода</th>
                <th className="text-left">Персонажи</th>
              </tr>
            </thead>
            <tbody className="table-hover">
              <tr>
                <td className="text-left">{episodeInfo.episode}</td>
                <td className="text-left">{episodeInfo.name}</td>
                <td className="text-left">{episodeInfo.air_date}</td>
                <td className="text-left">{episodeInfo.characters}</td>
              </tr>
            </tbody>
          </table>

        </div>
      </>)
}
