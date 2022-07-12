import React from 'react'
import { Link } from 'react-router-dom'
import './NextButton.scss'

export default function NextButton({ handleChangeNext, nextPage, counterPage }) {

  return (
    <Link to={`/characters/?page=${Number(counterPage) + Number(1)}`} className='button__link'>
      <button
        className="button__next"
        text="Next"
        onClick={handleChangeNext}
        disabled={!nextPage}
      >
        Next page
      </button>
    </Link>
  )
}
