import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getApiResource } from '../../utils/network';
import { BackButton } from '../../components/CharactersPage/BackButton/BackButton'

export default function PersonPage() {
  const { id } = useParams();

  // Заведём стейт для информации про персонажа
  const [personInfo, setPersonInfo] = useState(null);
  // Добавим лоадер
  const [loading, setLoading] = useState(true);

  console.log(personInfo); // =================================================================> TODO удалить
  // Получаем конкретного персонажа с API с использованием id из useParams
  useEffect(() => {
    const getDataFunc = (async () => {
      const info = await getApiResource(`https://rickandmortyapi.com/api/character/${id}`);
      const { data } = info;
      setPersonInfo(data);
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
          <img src={personInfo.image} alt="" />
          <h2>{personInfo.name}</h2>
          <h2>{personInfo.species}</h2>
          <h2>{personInfo.status}</h2>
        </div>
      </>)
}
