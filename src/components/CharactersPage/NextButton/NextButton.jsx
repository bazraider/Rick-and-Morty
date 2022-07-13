import React from 'react'
import { Link } from 'react-router-dom'
import './NextButton.scss'

export default function NextButton({ handleChangeNext, nextPage, counterPage, path }) {
  // Если в path есть второй параметр - значит идёт поиск
  return (
    <Link to={`/${path.firstParam}?page=${Number(counterPage) + 1}${path.secondParam}`} className='button__link'>
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
