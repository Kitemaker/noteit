import React, { Component } from 'react'
import { ITEMS, TERRITORIES } from './constants'
import './OptionsList.css'
import { Link } from 'react-router-dom'

class OptionsList extends Component {

  render() {
    const type = this.props.type
    
    let options = ITEMS
    if (type === 'territories') {
      options = TERRITORIES
    }
    return (
      <div className="OptionsList container">
          <h2>Please Select: </h2>
          <div className="card-deck">
            {options.map((option, index) => {
            return (
              <div className="card">            
              <h4 className="card-header">{ option.name }</h4>
              <Link className="nav-link" to={`/notes/${this.props.currentUsername}`}>
                <img className="card-img-top"  src={`/${type}/${option.id}.png`}  alt={option.name}  ></img>
              </Link>
              <div className="card-body">
                <div className="card-title">{ option.superpower }</div>
              </div>           
              </div>
            )
            })}
          </div>
      </div>
    );
  }
}

export default OptionsList
