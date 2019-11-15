import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Home from "./Home/Home";
import Nav from "./Nav/Nav";
import AdoptPortal from "./AdoptPortal/AdoptPortal";
import config from "./config";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      dogs: [],
      cats: [],
      persons: [],
      isValidated: false,
      adopter: {}
    };
  }
  componentDidMount() {
    console.log(config.REACT_APP_API_BASE);
    console.log(process.env.NODE_ENV);
    fetch(`${config.REACT_APP_API_BASE}/dogs`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(dog => this.setState({ dogs: [...this.state.dogs, dog] }));
    fetch(`${config.REACT_APP_API_BASE}/cats`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(cat => this.setState({ cats: [...this.state.cats, cat] }));
    fetch(`${config.REACT_APP_API_BASE}/person`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(person =>
        this.setState({ persons: [...this.state.persons, person] })
      );
  }

  validateAdopter = (first, adopter) => {
    if (first === true) {
      this.setState({
        isValidated: true,
        adopter: {
          ...adopter
        }
      });
    } else {
      this.setState({
        adopter: { ...adopter }
      });
    }
  };

  checkQueueNumber = name => {
    fetch(`${config.REACT_APP_API_BASE}/person/${name}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(num => {
        this.setState({
          adopter: {
            ...this.state.adopter,
            position: num
          }
        });
      });
  };

  removeAnimal = animalType => {
    fetch(`${config.REACT_APP_API_BASE}/${animalType}`, {
      method: "DELETE",
      "content-type": "application/json"
    }).then(res => {
      if (res.status === 204) {
        fetch(`${config.REACT_APP_API_BASE}/${animalType}`)
          .then(res => {
            if (res.ok) {
              return res.json();
            }
          })
          .then(animal => {
            if (animalType === "dogs") {
              this.setState({
                dogs: [animal]
              });
            } else {
              this.setState({
                cats: [animal]
              });
            }
          });
        }
    });
  };

  removePerson = () => { 
    fetch(`${config.REACT_APP_API_BASE}/person`, {
      method: 'DELETE',
      'content-type': 'application/json'
    })
    .then(res => {
      if(res.status === 204) {
        fetch(`${config.REACT_APP_API_BASE}/person`)
          .then(res => {
            if(res.ok) {
              return res.json();
            }
          })
          .then(person => {
            this.setState({
              persons: [person]
            })
          })
      }
    })
  };

  handleAdoption = (animalType) => {
    this.removeAnimal(animalType);
    this.removePerson();
    this.setState({
      isValidated: false,
      adopter: {}
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
    );
  }
}

export default App;
