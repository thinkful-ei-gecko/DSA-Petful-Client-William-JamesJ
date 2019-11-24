import React from 'react'
import './AdoptPortal.css'
import PetCard from '../PetCard/PetCard'

function AdoptPortal(props) {
  const dogs = props.data.dogs.map((dog, i) => dog ? (
    <PetCard
      key={dog.name}
      animal={dog}
      isValidated={props.data.isValidated}
      handleAdoption={props.handleAdoption}
    />
  ) : <li>No dogs available</li>)
  const cats = props.data.cats.map((cat, i) => cat ? (
    <PetCard
      key={cat.name}
      animal={cat}
      isValidated={props.data.isValidated}
      handleAdoption={props.handleAdoption}
    />
  ) : <li>No cats available</li>)

  const persons = !props.data.persons.length ? (
    <li>No one is in line!</li>
  ) : (
    props.data.persons.map((person, i) => {
      return i + 1 < props.data.persons.length ? (
        <li key={i}>{person.name},</li>
      ) : (
        <li key={i}>{person.name}</li>
      )
    })
  )

  function validateAdopter(e) {
    e.preventDefault()
    const adopter = e.target.adopter.value
    const password = e.target.password.value
    e.target.adopter.value = ''
    e.target.password.value = ''

    if (!props.data.persons.length) {
      props.validateAdopter(true, { name: adopter })
      props.checkQueueNumber(adopter, password)
    } else if (
      props.data.persons &&
      props.data.persons[0].name === adopter &&
      props.data.persons[0].password === password
    ) {
      props.validateAdopter(true, { name: adopter })
    } else {
      props.validateAdopter(false, { name: adopter })
      props.checkQueueNumber(adopter, password)
    }
  }

  return (
    <div>
      <div className="AdoptPortal__person-queue">
        <h3>Currently in line: </h3>
        <ul>{persons}</ul>
      </div>
      {props.data.isValidated && <p>Your turn to adopt!</p>}
      {props.data.adopter.position > 0 && (
        <p>
          You are currently #{props.data.adopter.position + 1} in line to adopt!
        </p>
      )}
      {props.data.adopter.position === -1 && (
        <p>You are not registered! Please contact us to get in line!</p>
      )}
      <form
        className="AdoptPortal__line-form"
        onSubmit={e => validateAdopter(e)}
      >
        <div className="AdoptPortal__label-input">
          <label htmlFor="adopter">
            Enter Your Name
            <input type="text" name="adopter" id="adopter" />
          </label>
          <label htmlFor="password">
            Enter Your Password
            <input type="password" name="password" id="password" />
          </label>
        </div>
        <button className="AdoptPortal__button">Get In Line</button>
      </form>
  <p>{!!props.data.alert && props.data.alert}</p>
      <div className="AdoptPortal__pet-cards">
        {dogs}
        {cats}
      </div>
    </div>
  )
}

export default AdoptPortal
