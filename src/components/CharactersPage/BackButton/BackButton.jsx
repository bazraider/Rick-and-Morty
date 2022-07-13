import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './BackButton.scss'

export function BackButton() {
  const navigate = useNavigate();

  const handleGoBack = (e) => {
    e.preventDefault();
    navigate(-1);
  }

  return (
    <Link to='#'>
      <button
        className='button__goback'
        onClick={handleGoBack}
      >
        Go back
      </button>
    </Link>
  )
}
