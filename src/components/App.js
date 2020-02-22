import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (newType) => {
    this.setState({
      filters: {
        ...this.state.filters, type: newType
      },
    })
  }

  onFindPetsClick = () => {
    let type = this.state.filters.type
    if (type === "all") {
      fetch(`/api/pets`)
        .then((response) => {
          return response.json();
        })
        .then((petData) => {
          this.setState({
            pets: petData
          })
        });
    } else {
      fetch(`/api/pets?type=${type}`)
        .then((response) => {
          return response.json();
        })
        .then((petData) => {
          this.setState({
            pets: petData
          })
        });
      }
  }

  onAdoptPet = (id) => {
    let newPets = this.state.pets.map(pet => {
      if (pet.id === id) {
        pet.isAdopted = true;
      }
      return pet
    })
    this.setState({
      pets: newPets
    })

  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onFindPetsClick={this.onFindPetsClick} onChangeType={this.onChangeType}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    ) 
  }
}

export default App
