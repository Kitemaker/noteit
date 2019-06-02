import React, { Component } from 'react'
//import { ITEMS, TERRITORIES } from './constants'
import './NotesList.css'

class NotesList extends Component {

  render() {
    const type = this.props.type
    let options = [{id:"1", name:'note1', text:'aaaa'},{id:"2",name:'note2', text:'bbbb'},{id:"3",name:'note3', text:'aacccc'}]

    return (
      <div className="OptionsList container">
          <h2>Please Select: </h2>
          <div className="card-deck">
            {options.map((option, index) => {
            return (
              <div className="card">
              <h4 className="card-header light-yellow">{ option.name }</h4>           
              <div className="card-body">
                <div className="card-title">{ option.text }</div>
              </div>
              </div>
            )
            })}
          </div>
      </div>
    );
  }
}

export default NotesList
