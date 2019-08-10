import React, { Component } from 'react'
import './NoteCard.css'


class NoteCard extends Component {

  render() {
   
    const  title = this.props.title
    const  value = this.props.value  
    return (
    <div>
              <div className="card" style={{minWidth:"20%"}}>
              <h4 className="card-header">{ title }</h4> 
              <button onClick={this.props.click}>X</button>          
              <div className="card-body">
                <div className="card-title">{ value }</div>
              </div>
        </div>
   
    </div>
    )
  }
}

export default NoteCard
