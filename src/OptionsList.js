import React, { Component } from 'react'
import { ITEMS, appConfig } from './constants'
import './OptionsList.css'
import { Link } from 'react-router-dom'
import { UserSession } from 'blockstack'

class OptionsList extends Component {

  render() {
    this.userSession = new UserSession({ appConfig })
    this.username = this.userSession.loadUserData().username
    const type = this.props.type;
   
    let options = ITEMS
    // if (type === 'territories') {
    //   options = TERRITORIES
    // }
    return (
      <div className="OptionsList container">
          <h2>Please Select: </h2>
          <div className="card-deck">
            {options.map((option, index) => {
            return (
              <div className="card">            
              <h4 className="card-header">{ option.name }</h4>
              <Link className="nav-link" to={`/${option.id}/${this.username}`}>
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
