import React from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'

function Nav() {
  return(
  <ul className='Nav__list'>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/adopt">Adopt</Link></li>
  </ul>
  )
}

export default Nav
