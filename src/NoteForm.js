import React from 'react';
import { UserSession } from 'blockstack'
import { appConfig, NOTES_FILE } from './constants'
import { Redirect } from 'react-router-dom'

class NoteForm extends React.Component {
    constructor(props) {
     
      super(props);
      this.state = {
        id: '',       
        name:'',  
        value: ''};

      this.data = [];
      this.userSession = new UserSession({ appConfig });
      this.username = this.userSession.loadUserData().username;
      console.log('message form Noteform');
      let options = {
        decrypt: false
      };

      // read notes data
      this.userSession.getFile(NOTES_FILE, options)
      .then((fileContents) => {
        if(fileContents) {
          console.log("message from getfile = ", JSON.parse(fileContents));
          let notelist = JSON.parse(fileContents);
          this.notelist = JSON.parse(fileContents);
          this.data  = this.notelist.data;         
        } 
      })
      
     }
  
    handleNameChange = (event) =>{
      this.setState({name: event.target.value});
    }
    handleValueChange=(event) =>{
        this.setState({value: event.target.value});
      }
  
    handleSubmit=(event)=> {

        this.data = this.props.data;
        this.data.push({id: this.data.toString() , name:this.state.name, text: this.state.value})
        let data =  {data: this.data};
        let options = {
          encrypt: false
        }
        this.userSession.putFile("notes.json", JSON.stringify(data), options)
        .then(() => {     
               return(
             <Redirect to={`/notes/${this.username}`} />
       
               )
        });    
    
    }

    handleCancel = (event) => {     
        
      }     
  
    render() {
        return (
          <div>
            <form>
               <h3 align = "left" >Name</h3>
               <input type="text" id="inputName" rows="6" cols="100" onChange={this.handleNameChange} value={this.props.name}/>
               <h3 align = "left" >Note</h3>
               <textarea id="inputValue" rows="6" cols="100" onChange={this.handleValueChange} value={this.props.value}/>                
            
              <input type="submit" value="Submit" onClick={this.handleSubmit}/>
              <input type="submit" value="Canel" onClick={this.handleCancel}/>
            </form>
            </div>
          );
        }
  }

export default NoteForm;