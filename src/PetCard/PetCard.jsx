import React from 'react';
import './PetCard.css'

function PetCard(props) {
  return (
    <>
      <div className='PetCard__container'>
        <h2 className='PetCard__name'>{props.animal.name}</h2>
        <img src={props.animal.imageURL} alt={props.animal.imageDescription} className='PetCard__picture' />
        <ul className='PetCard__info'>
          <li className='PetCard__li'><span className='PetCard__bold'>Sex: </span>{props.animal.sex}</li>
          <li className='PetCard__li'><span className='PetCard__bold'>Age: </span>{props.animal.age}</li>
          <li className='PetCard__li'><span className='PetCard__bold'>Breed: </span>{props.animal.breed}</li>
          <li className='PetCard__li'><span className='PetCard__bold'>My story: </span>{props.animal.story}</li>
        </ul>
        <button className='PetCard__button' disabled={!props.isValidated} onClick={() => {props.handleAdoption(props.animal.animalType)}}>Adopt Me!</button>
      </div>
    </>
  )
}

export default PetCard
