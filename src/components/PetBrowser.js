import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  render() {
    // const petCard = this.props.map(pet => (<Pet key={pet.id} pet={pet}/>))
    
    return <div className="ui cards">{this.props.pets.map((pet,index) => (<Pet onAdoptPet={this.props.onAdoptPet} key={index} pet={pet}/>))}</div>
  }
}

export default PetBrowser
