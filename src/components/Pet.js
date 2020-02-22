import React from 'react'

class Pet extends React.Component {
  
  handleClick = () => {
    this.props.onAdoptPet(this.props.pet.id)
  }

  renderButton = () => {
    if (this.props.pet.isAdopted) {
      return <button className="ui disabled button">Already adopted</button>
    } else {
      return <button onClick={this.handleClick} className="ui primary button">Adopt pet</button>
    }
  }
  
  render() {
    console.log(this.props.onAdoptPet)
    return (
      <div className="card">
        <div className="content">
          <a className="header">
            {this.props.pet.gender==="female"? '♀' : '♂'}
            {this.props.pet.name}
          </a>
          <div className="meta">
            <span className="date">{this.props.pet.type}</span>
          </div>
          <div className="description">
            <p>Age: {this.props.pet.age}</p>
            <p>Weight: {this.props.pet.weight}</p>
          </div>
        </div>
        <div className="extra content">
          {this.renderButton()}
        </div>
      </div>
    )
  }
}


export default Pet

// {(this.props.pet.isAdopted)?  
