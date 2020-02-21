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

  onChangeType = (event) => {
    const filter = event.target.value
    this.setState((state, props) => ({
      filters: {
        type: filter
      }
    }))
  }

  onFindPetsClick = () => {
    const type = this.state.filters.type
    fetch(`/api/pets${type === 'all' ? '' : `?type=${type}`}`)
    .then(resp => resp.json())
    .then(pets => {
      this.setState((state, props) => ({
        pets: pets
      }))
    })
  }

  onAdoptPet = (petId) => {
    const updatedPets = this.state.pets.map(pet => {
      if(pet.id === petId)
        pet.isAdopted = true
      return pet
    })
    this.setState((state, props) => ({
      pets: updatedPets
    }))
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
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
