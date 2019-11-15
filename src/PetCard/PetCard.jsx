import React from 'react'

function PetCard(props) {
  return (
    <>
      <h2>{props.animal.name}</h2>
      <img src={props.animal.imageURL} alt={props.animal.imageDescription}/>
      <ul className='PetCard__info'>
        <li>{props.animal.sex}</li>
        <li>{props.animal.age}</li>
        <li>{props.animal.breed}</li>
      </ul>
      <p>{props.animal.story}</p>
      <button disabled={!props.isValidated} onClick={() => {props.handleAdoption(props.animal.animalType)}}>Adopt Me!</button>
    </>
  )
}

export default PetCard
