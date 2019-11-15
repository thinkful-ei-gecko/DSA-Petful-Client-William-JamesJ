import React from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'

function Nav() {
  return(
  <ul className='Nav__list'>
    <Link to="/">Home</Link>
    <Link to="/adopt">Adopt</Link>
  </ul>
  )
}

export default Nav
