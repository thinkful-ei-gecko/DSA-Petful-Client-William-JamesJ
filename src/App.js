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
      isValidated: false
    }
  }
  componentDidMount() {
    console.log(config.REACT_APP_API_BASE)
    console.log(process.env.NODE_ENV)
    fetch(`${config.REACT_APP_API_BASE}/dogs`).then(res => {
      if (res.ok) {
        return res.json()
      }
    })
    .then(dog => this.setState({dogs: [...this.state.dogs, dog]}))
    fetch(`${config.REACT_APP_API_BASE}/cats`).then(res => {
      if (res.ok) {
        return res.json()
      }
    })
    .then(cat => this.setState({cats: [...this.state.cats, cat]}))
    fetch(`${config.REACT_APP_API_BASE}/person`).then(res => {
      if (res.ok) {
        return res.json()
      }
    })
    .then(person => this.setState({persons: [...this.state.persons, person]}))
  }

  validateAdopter = () => {
    this.setState({
      isValidated: true
    })
  }
  render() {
    return (
      <div className="App">
        <h1>Petful</h1>
        <p>Connecting every pet to its person</p>
        <Nav />
        <Route exact path="/" component={Home} />
        <Route exact path="/adopt" render={() => (
          <AdoptPortal data={this.state} validateAdopter={this.validateAdopter}/>
        )} />
      </div>
    )
  }
}

export default App
