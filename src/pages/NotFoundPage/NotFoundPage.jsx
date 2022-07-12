import './NotFoundPage.scss';
import React from 'react'
import { useLocation } from 'react-router-dom';
import notFound_img from '../../static/notfound.png'

export default function NotFoundPage() {
  const location = useLocation();
  location.pathname;

  return (
    <>
      <img className='img' src={notFound_img} alt="Not Found" />
      <p className='text'>No match for <u>{location.pathname}</u></p>
    </>
  )
}
