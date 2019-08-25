import React, { Component } from 'react'
import './NotesList.css'
import { UserSession } from 'blockstack'
import { appConfig , NOTES_FILE} from './constants'
//import NoteCard from './NoteCard'
import NoteCardNew from './NoteCardNew'
import idGenerator from 'react-id-generator';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';



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
    this.useStyles = makeStyles(theme => ({
      container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(3),
      },
      dense: {
        marginTop: theme.spacing(2),
      },
      menu: {
        width: 200,
      },
      paper: {
        padding: theme.spacing(5,20),

        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        margin: theme.margin(10),
      },
    }));
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
          <Typography variant="h3" gutterBottom color="textPrimary">
            Add Note...
          </Typography>
          <div>
              <Paper className={this.useStyles.paper}>
                <div>
                  {/* <input className="w3-input w3-border" type="text" required=""  onChange={this.handleTitleChange} placeholder="note title..."/>  
                    */}

                  <TextField
                          id="note-title"
                          label="Title"
                          fullWidth
                          className={this.useStyles.textField}                          
                          onChange={this.handleTitleChange}
                          margin="normal"
                          variant="outlined"
                          placeholder="enter title"
                        />
                </div> 
                {/* <textarea className="w3-input w3-border" style={{resize:"none"}} autoComplete="off" onChange={this.handleValueChange}  placeholder="write note here..."/> */}
                <TextField
                      id="note-value"
                      label="Text"
                      fullWidth
                      multiline
                      rows="4"
                      placeholder="enter note"
                      className={this.useStyles.textField}
                      onChange={this.handleValueChange}
                      margin="normal"
                      variant="outlined"
                    />
                {/* <div><button type="button" className="w3-btn w3-padding w3-blue" onClick={this.addNoteHandler} style={{width:"120px"}}>Add </button></div>  */}
                <Button variant="contained" fullWidth onClick={this.addNoteHandler} color="primary">Add </Button>             
                </Paper>
          </div>
          <div className="card-deck" style={{marginTop:"20px"}}>
            
            {cardarray.map((option, index) => {
            return <div ><NoteCardNew
                  click={() => this.deleteNoteHandler(index)}
                  key={option.id} 
                  title = {option.name}
                  value={option.text} />
                  </div>
                
            })}
          </div>
      </div>
    );
  }
}

export default NotesList
