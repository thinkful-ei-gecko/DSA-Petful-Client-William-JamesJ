import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import Home from './Home/Home'
import Nav from './Nav/Nav'
import AdoptPortal from './AdoptPortal/AdoptPortal'
import config from './config'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      dogs: [],
      cats: [],
      persons: [],
      isValidated: false,
      adopter: {},
      alert: ''
    }
  }
  componentDidMount() {
    fetch(`${config.REACT_APP_API_BASE}/dogs`)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
      })
      .then(dog => this.setState({ dogs: [...this.state.dogs, dog] }))
    fetch(`${config.REACT_APP_API_BASE}/cats`)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
      })
      .then(cat => this.setState({ cats: [...this.state.cats, cat] }))
    fetch(`${config.REACT_APP_API_BASE}/person`)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
      })
      .then(persons => this.setState({ persons }))
  }

  validateAdopter = (first, adopter) => {
    if (first === true) {
      this.setState({
        isValidated: true,
        adopter: {
          ...adopter,
        },
      })
    } else {
      this.setState({
        adopter: { ...adopter },
      })
    }
  }

  addPerson = (name, password) => {
    const person = {
      name,
      password,
    }
    fetch(`${config.REACT_APP_API_BASE}/person`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(person),
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
      })
      .then(person => {
        let newPerson = { name: name, password: password }
        if (this.state.persons) {
          this.setState({
            persons: [...this.state.persons, newPerson],
          })
        } else {
          this.setState({
            persons: [newPerson],
          })
        }
      })
  }

  checkQueueNumber = (name, password) => {
    fetch(`${config.REACT_APP_API_BASE}/person/${name}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name,
        password,
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
      })
      .then(num => {
        if (num === -1) {
          this.addPerson(name, password)
          this.setState({
            adopter: {
              name,
              position: this.state.persons ? this.state.persons.length : 0,
            },
          })
        } else {
          this.setState({
            adopter: {
              ...this.state.adopter,
              position: !!num ? num : -1,
            },
          })
        }
      })
  }

  removeAnimal = animalType => {
    fetch(`${config.REACT_APP_API_BASE}/${animalType}`, {
      method: 'DELETE',
      'content-type': 'application/json',
    }).then(res => {
      if (res.status === 204) {
        fetch(`${config.REACT_APP_API_BASE}/${animalType}`)
          .then(res => {
            if (res.ok) {
              return res.json()
            }
          })
          .then(animal => {
            if (animalType === 'dogs') {
              this.setState({
                dogs: [animal],
              })
            } else {
              this.setState({
                cats: [animal],
              })
            }
          })
      }
    })
  }

  removePerson = () => {
    fetch(`${config.REACT_APP_API_BASE}/person`, {
      method: 'DELETE',
      'content-type': 'application/json',
    }).then(res => {
      if (res.status === 204) {
        fetch(`${config.REACT_APP_API_BASE}/person`)
          .then(res => {
            if (res.ok) {
              return res.json()
            }
          })
          .then(persons => {
            this.setState({
              persons,
            })
          })
      }
    })
  }

  handleAdoption = animalType => {
    this.removeAnimal(animalType)
    this.removePerson()
    setTimeout(() => {
      this.setState({
        alert: ''
      })
    }, 5000)
    this.setState({
      isValidated: false,
      adopter: {},
      alert: `Congratulations! You successfully adopted!`
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Petful</h1>
        <p>Connecting every pet to its person</p>
        <Nav />
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/adopt"
          render={() => (
            <AdoptPortal
              data={this.state}
              validateAdopter={this.validateAdopter}
              checkQueueNumber={this.checkQueueNumber}
              handleAdoption={this.handleAdoption}
            />
          )}
        />
      </div>
    )
  }
}

export default App
