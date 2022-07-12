import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getApiResource } from '../../utils/network';

export default function PersonPage() {
  const { id } = useParams();

  // Заведём стейт для информации про персонажа
  const [personInfo, setPersonInfo] = useState(null);
  // Добавим лоадер
  const [loading, setLoading] = useState(true);

  console.log(personInfo);
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

  return loading
    ? (<div class="spinner"></div>)
    : (<div className="person__wrapper">
      <img src={personInfo.image} alt="" />
      <p>{personInfo.name}</p>
      <p>{personInfo.species}</p>
      <p>{personInfo.status}</p>
    </div>)
}
