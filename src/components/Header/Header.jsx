import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';
import logo from '../../static/logo.png'

export default function Header() {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="rick and morty logo" />
      </div>
      <div className="navigation">
        <NavLink to="/">Главная</NavLink>
        <NavLink to="/serial">Список серий</NavLink>
      </div>
    </header>
  )
}
