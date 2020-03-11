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
      },
      isAdopted: true
    }
  }

  onChangeType = (value) => {
    this.setState({ filters: { type: value } });
  }

  onAdoptPet = (id) => {
    const pets = this.state.pets.map(pet => {
      return pet.id === id ? { ...pet, isAdopted: true } : pet;
    })
    this.setState({ pets: pets });
  };


  
  // fetchPets = () => {

  //   // console.log("hitting this?")
  //   const allPets = "/api/pets"
  //   const filterUrl = `/api/pets?${this.state.filters.type}`

  //   const url = this.state.filters.type === "all" ? allPets : filterUrl;
    
  //   fetch(url)
  //   .then(resp => resp.json())
  //   .then(pets => {
  //     this.setState({  pets: pets })
  //   })
  // }

  fetchPets = () => {
    let endpoint = '/api/pets';

    if (this.state.filters.type !== 'all') {
      endpoint += `?type=${this.state.filters.type}`;
    }

    fetch(endpoint)
      .then(res => res.json())
      .then(pets => this.setState({ pets: pets }));
  };


  render() {
    console.log(this.state.pets)
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType}
              
              onFindPetsClick={this.fetchPets}/>
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
