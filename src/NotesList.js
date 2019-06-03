import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
//import { ITEMS, TERRITORIES } from './constants'
import './NotesList.css'
import { UserSession } from 'blockstack'
import { appConfig , NOTES_FILE} from './constants'
class NotesList extends Component {

  constructor(props) {
    super(props)

    this.userSession = new UserSession({ appConfig })
    this.username = this.userSession.loadUserData().username
    
    this.state = {
      notes: []
    } 

    this.readNotes =  this.readNotes.bind(this)   
    console.log('from constructor', this.state.notes);
  }

  componentWillMount() {
   this.readNotes() 
  }

  readNotes = ()=>{
    let options = {
      decrypt: false
    }     
    this.userSession.getFile(NOTES_FILE, options)
    .then((fileContents) => {
      if(fileContents) {
        console.log("message from getfile = ", JSON.parse(fileContents));
        let notelist = JSON.parse(fileContents);
        this.setState({         
          notes:  notelist.data
        });
      } 
    })

    this.userSession.getFile(NOTES_FILE , options)
    .then((fileContents) => {
       console.log("message from getfile = ", JSON.parse(fileContents));
       let notelist = JSON.parse(fileContents);
       this.setState({         
        notes:  notelist.data
      });
  
      
    });
    
  }
  sendNotes = ()=>{

    let data =  {data: [{id:"1", name:'note1', text:'aaaa'},{id:"2",name:'note2', text:'bbbb'},{id:"3",name:'note3', text:'aacccc'}]};
    let options = {
      encrypt: false
    }
    this.userSession.putFile("notes.json", JSON.stringify(data), options)
    .then(() => {
       console.log("Meeage from putFile",JSON.stringify(data));
    });

    
  }

  render() {
    const type = this.props.type
    this.readNotes =  this.readNotes.bind(this)    
    let options = this.state.notes
    console.log(window.location.pathname );
    console.log('/addnote/' + this.username );
    if(window.location.pathname === '/addnote/' + this.username) {
      return (
        <Redirect to={`/addnote/${this.username}`}/>
      )
    }

    return (
      <div className="OptionsList container">        
         
          <Link className="nav-link" to={`/addnote/${this.username}`}>Add Note</Link>         
          <div className="card-deck">
            {options.map((option, index) => {
            return (
              <div className="card">
              <h4 className="card-header">{ option.name }</h4>           
              <div className="card-body">
                <div className="card-title">{ option.text }</div>
              </div>
              </div>
            )
            })}
          </div>
          <p>{this.username}</p>
          <button onClick={this.sendNotes}>Send Data</button>
          <button onClick={this.readNotes}>Read Data</button>
          <p>{this.state.notes.toString()}</p>
      </div>
    );
  }
}

export default NotesList
