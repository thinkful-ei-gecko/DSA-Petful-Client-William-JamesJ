import React from 'react'
import './AdoptPortal.css'
import PetCard from '../PetCard/PetCard'

function AdoptPortal(props) {
  const dogs = props.data.dogs.map(dog => (
    <PetCard animal={dog} isValidated={props.data.isValidated} handleAdoption={props.handleAdoption}/>
  ))
  const cats = props.data.cats.map(cat => (
    <PetCard animal={cat} isValidated={props.data.isValidated} handleAdoption={props.handleAdoption}/>
  ))

  function validateAdopter(e) {
    e.preventDefault()
    const adopter = e.target.adopter.value
    const password = e.target.password.value

    if (
      props.data.persons[0].name === adopter &&
      props.data.persons[0].password === password
    ) {
      props.validateAdopter(true, { name: adopter })
    } else {
      props.validateAdopter(false, { name: adopter })
      props.checkQueueNumber(adopter)
    }
  }

  return (
    <div>
      <form
        className="AdoptPortal__line-form"
        onSubmit={e => validateAdopter(e)}
      >
        <label htmlFor="adopter">
          Enter Your Name
          <input type="text" name="adopter" id="adopter" />
        </label>
        <label htmlFor="password">
          Enter Your Password
          <input type="password" name="password" id="password" />
        </label>
        <button>Get In Line</button>
      </form>
      {props.data.isValidated && <p>Your turn to adopt!</p>}
      {props.data.adopter.position > 0 && (
        <p>You are currently #{props.data.adopter.position + 1} in line to adopt!</p>
      )}
      <div className="AdoptPortal__pet-cards">
        {dogs}
        {cats}
      </div>
    </div>
  )
}

export default AdoptPortal
