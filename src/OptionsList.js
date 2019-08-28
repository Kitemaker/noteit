import React, { Component } from 'react'
import { appConfig,NOTES_FILE, TODOS_FILE } from './constants'
import { UserSession } from 'blockstack'
import './OptionsList.css'

// import { UserSession } from 'blockstack'

class OptionsList extends Component {
  constructor(props) {
    super(props)  
    this.userSession = new UserSession({ appConfig })  
     
    this.state = {
      notes: [],
      todos:[],     
    } 
  
    }

    componentDidMount(){
      // this.readNotes();
    }
    
    
  readNotes=()=>{
    
    let options = {
      decrypt: false
    };     
    const  userSession = new UserSession({ appConfig })   
    userSession.getFile(NOTES_FILE, options)
    .then((notesData) => {
      if(notesData) {
        console.log("message from readNotes getfile items  = ", JSON.parse(notesData));
        let notelist = JSON.parse(notesData);
        if(notelist.data){
        this.setState({         
          notes:  notelist.data
        });
      }
     
         
       
      };
    }).catch((error) => {
      console.error('message from read notes value of this.state.notes Error:', error);    
    });
   
  }

    render() {
     
      this.username = this.props.currentUsername;
      const type = this.props.type;  
      // console.log('message from Opthios', this.props.notesData)
      let options = [
        {
          id: 'notes',
          name: 'Notes'    
        },
        {
          id: 'todos',
          name: 'To-Do Lists'    
        }
       ] ; 
      return (
        <div className="OptionsList container">         
            <div className="card-deck">
                <div className="card" >            
                  <h4 className="card-header">NOTES</h4>                     
                    <img className="card-img-top"  src="./items/notes.png"  id="Notes" onClick={this.props.click} alt="notes"  ></img>                  
                  <div className="card-body">
                    <div className="card-title">
                    {/* {(this.state.notes)?this.state.notes.length:0} */}
                    </div>
                  </div>           
                </div>
                <div className="card" >            
                  <h4 className="card-header">TO-DOs</h4>                                 
                    <img className="card-img-top"  src="./items/todos.png" id="Todos" onClick={this.props.click}  alt="todos"  ></img>                  
                  <div className="card-body">
                    <div className="card-title">
                    {/* {(this.state.notes)?this.state.notes.length:0} */}
                    </div>
                  </div>           
                </div>
              
           
            </div>
        </div>
      );
    }

}

export default OptionsList
