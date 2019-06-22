import React, { Component } from 'react'
//import { Link, Redirect } from 'react-router-dom'
//import { ITEMS, TERRITORIES } from './constants'
import './NotesList.css'
import { UserSession } from 'blockstack'
import { appConfig , NOTES_FILE} from './constants'
import NoteCard from './NoteCard'
import idGenerator from 'react-id-generator';
class NotesList extends Component {

  constructor(props) {
    super(props)

    this.userSession = new UserSession({ appConfig })
    this.username = this.userSession.loadUserData().username
    
    this.state = {
      notes: [],
      newNoteTitle:"",
      newNoteValue:""
    } 

   // this.readNotes =  this.readNotes.bind(this)   
    console.log('from constructor', this.state.notes);
  }

  componentWillMount() {
   this.readNotes() 
  }

  deleteNoteHandler = (personIndex) => {

    console.log('message form deleteNoteHandler');
    // const persons = this.state.persons.slice();
    const notes = [...this.state.notes];    
    notes.splice(personIndex, 1);
    
     let options = {
        encrypt: false
      }
    this.userSession.putFile("notes.json", JSON.stringify({"data":notes}), options)
      .then(() => {
         console.log("Meeage from put file of deleteNoteHandler",JSON.stringify(notes));
         this.readNotes();
      }); 
  }


  readNotes = ()=>{
    
    let options = {
      decrypt: false
    }     
    this.userSession.getFile(NOTES_FILE, options)
    .then((fileContents) => {
      if(fileContents) {
        console.log("message from readNotes getfile items  = ", JSON.parse(fileContents));
        let notelist = JSON.parse(fileContents);
        this.setState({         
          notes:  notelist.data
        });
      } 
    });
    console.log('message from readNotes value of this.state.notes', this.state.notes);
  } 
  
  sendNotes = ()=>{
    console.log('message from snednote ');
    let newdata =  {data: this.state.notes};
    let options = {
      encrypt: false
    }
    this.userSession.putFile("notes.json", JSON.stringify(newdata), options)
    .then(() => {
       console.log("Meeage from putFile",JSON.stringify(newdata));
       this.readNotes();
    });   
    
  }


  handleTitleChange = (event) =>{
    this.setState({
      newNoteTitle: event.target.value
    });
  }
  handleValueChange=(event) =>{
      this.setState({
        newNoteValue: event.target.value
        });
    }

    addNoteHandler = () =>{
      console.log('message from addNoteHandler');
      if(this.state.notes){
      let newData = this.state.notes;
      newData.unshift({id:idGenerator(), name: this.state.newNoteTitle, text:this.state.newNoteValue});
      let options = {
        encrypt: false
      }
      this.userSession.putFile("notes.json", JSON.stringify({"data":newData}), options)
      .then(() => {
         console.log("Meeage from putFile",JSON.stringify(newData));
         this.readNotes();
      });
    }
      

  }

  render() { 
    let cardarray = [];
    if (this.state.notes)
    {
      cardarray = this.state.notes;
      console.log('value of this.state.notes is not good');
    }
 
    console.log('message from render value of this.state.notes', this.state.notes);
    console.log('message from render value of cardarray', cardarray);

    return (
      <div className="OptionsList container">        
          <div className="w3-container w3-teal"> <h2>Add Note</h2></div>
          <div>
              <form className="w3-container w3-card-4">
                <div>
                  <input className="w3-input w3-border" type="text" required=""  onChange={this.handleTitleChange} placeholder="note title..."/>     
                </div> 
                <textarea className="w3-input w3-border" style={{resize:"none"}} autoComplete="off" onChange={this.handleValueChange}  placeholder="write note here..."/>
                <div><button type="button" className="w3-btn w3-padding w3-teal" onClick={this.addNoteHandler} style={{width:"120px"}}>Add </button></div>              
              </form>
          </div>
          <div className="card-deck" style={{marginTop:"20px"}}>
            
            {cardarray.map((option, index) => {
            return <NoteCard 
                  click={() => this.deleteNoteHandler(index)}
                  key={option.id} 
                  title = {option.name}
                  value={option.text} />
                
            })}
          </div>
      </div>
    );
  }
}

export default NotesList
