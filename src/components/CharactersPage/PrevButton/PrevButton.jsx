import React from 'react'
import { Link } from 'react-router-dom'
import './PrevButton.scss'

export default function PrevButton({ handleChangePrev, prevPage, counterPage }) {

  return (
    <Link to={`/characters/?page=${counterPage - 1}`} className='buttons'>
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
