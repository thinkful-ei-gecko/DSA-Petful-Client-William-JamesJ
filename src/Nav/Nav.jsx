import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  return(
  <ul>
    <Link to="/">Home</Link>
    <Link to="/adopt">Adopt</Link>
  </ul>
  )
}

export default Nav
