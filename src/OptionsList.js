import React, { Component } from 'react'
import { ITEMS, appConfig } from './constants'
import './OptionsList.css'

import { UserSession } from 'blockstack'

class OptionsList extends Component {

  render() {
    this.userSession = new UserSession({ appConfig })
    this.username = this.userSession.loadUserData().username
    const type = this.props.type;  
    let options = ITEMS ; 
    return (
      <div className="OptionsList container">         
          <div className="card-deck">
            {options.map((option, index) => {
            return (
              <div className="card" key={index}>            
              <h4 className="card-header">{ option.name }</h4>  
              {console.log(type,option.id)}                
                <img className="card-img-top"  src={`/${type}/${option.id}.png`}  alt={option.name}  ></img>                  
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
