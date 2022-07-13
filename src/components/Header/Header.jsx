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
        <NavLink to="/characters/?page=1">Персонажи</NavLink>
        <NavLink to="/seasons">Эпизоды</NavLink>
        <NavLink to="/location?page=1">Локации</NavLink>
      </div>
    </header>
  )
}
