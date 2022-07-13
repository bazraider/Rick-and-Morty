import React from 'react'
import { Link } from 'react-router-dom'
import './PrevButton.scss'

export default function PrevButton({ handleChangePrev, prevPage, counterPage, path }) {
  // Если в path есть второй параметр - значит идёт поиск
  return (
    <Link to={`/${path.firstParam}?page=${Number(counterPage) - 1}${path.secondParam}`} className='buttons'>
      <button
        className="button__prev"
        text="Previous"
        onClick={handleChangePrev}
        disabled={!prevPage}
      >
        Previous page
      </button>
    </Link>
  )
}
