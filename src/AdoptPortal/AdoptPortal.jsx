import React from 'react'
import PetCard from '../PetCard/PetCard'

function AdoptPortal(props) {
  const dogs = props.data.dogs.map(dog => (
    <PetCard animal={dog}/>
  ))

  const cats = props.data.cats.map(cat => (
    <PetCard animal={cat}/>
  ))
  
  return (
    // form
    // AnimalCard
    <div>
      <form action="submit">
        <label htmlFor="adopter">Enter Your Name
          <input type="text" name="adopter" id="adopter"/>
        </label>
        <button>Get In Line</button>
      </form>

      <div className='AdoptPortal__pet-cards'>
        {dogs}
        {cats}
      </div>
    </div>
  )
}

export default AdoptPortal