import React, { Component } from 'react'
import './NotesList.css'
import { UserSession } from 'blockstack'
import { appConfig , TODOS_FILE} from './constants'
//import NoteCard from './NoteCard'
import NoteCardNew from './NoteCardNew'
import idGenerator from 'react-id-generator';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';
import TodoListItem from './TodoListItem';
import TodoForm from './TodoForm';
import Grid from '@material-ui/core/Grid';

class TodosList extends Component {

  constructor(props) {
    super(props)

    this.userSession = new UserSession({ appConfig })
    this.username = this.userSession.loadUserData().username
    
    this.state = {
      todos: [],
      newTodoItemDone:false,
      newTodoItemValue:""
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


  removeAll = () => {

    console.log('message form removeAll');
    // const persons = this.state.persons.slice();   
     let options = {
        encrypt: false
      }
    this.userSession.putFile("todos.json", JSON.stringify({"data":[]}), options)
      .then(() => {
         console.log("Message from removeAll done");
         this.readNotes();
      }); 
  }

  removeItem = (personIndex) => {

    console.log('message form deleteNoteHandler');
    // const persons = this.state.persons.slice();
    const todos = [...this.state.todos];    
    todos.splice(personIndex, 1);
    let i = 0;
    for(i=0;i<todos.length;i++)
    {
      todos[i].id = i;
    }
     let options = {
        encrypt: false
      }


    this.userSession.putFile("todos.json", JSON.stringify({"data":todos}), options)
      .then(() => {
         console.log("Meeage from put file of deleteNoteHandler",JSON.stringify(todos));
         this.readNotes();
      }); 
  }


  readNotes = ()=>{
    
    let options = {
      decrypt: false
    }     
    this.userSession.getFile(TODOS_FILE, options)
    .then((fileContents) => {
      if(fileContents) {
        console.log("message from readNotes getfile items  = ", JSON.parse(fileContents));
        let todolist = JSON.parse(fileContents);
        if(todolist){
        this.setState({         
          todos:  todolist.data
        });
      }
      else
      {
        this.setState({         
          todos:  []
        });
      }    
      } 
    }).catch((error) => {
      console.error('message from readNotes value of this.state.notes Error:', error);
    
    });
    
  } 
  
  sendNotes = ()=>{
    console.log('message from snednote ');
    let newdata =  {data: this.state.todos};
    let options = {
      encrypt: false
    }
    this.userSession.putFile(TODOS_FILE, JSON.stringify(newdata), options)
    .then(() => {
       console.log("Message from putFile",JSON.stringify(newdata));
       this.readNotes();
    });   
    
  }


  markTodoDone=(event)=> {
    console.log('msg from markTodoDone', event);
    let todoData = [...this.state.todos];  
   let i, j;
    for(i = 0; i < todoData.length;i++)
    {
      if(todoData[i].id === parseInt(event.target.value))
      {
        j = i;
        break;
    }
    }

    let todoUpdated = todoData[j];
  //  todoData.splice(index, 1);
    todoUpdated.done = !todoUpdated.done;
    todoData[j] = todoUpdated;
    //this.state.todos[index] = todo;
  //  todoUpdated.done  ? todoData.push(todoUpdated) :todoData.unshift(todoUpdated);
    //this.setState({todos: todoData});  
    let options = {
      encrypt: false
    }
    this.userSession.putFile(TODOS_FILE, JSON.stringify({"data":todoData}), options)
    .then(() => {
      console.log("Message from put file of markTodoDone",JSON.stringify(todoData));
     this.readNotes();
    }); 

  }

  handleValueChange=(event) =>{
      this.setState({
        newTodoItemValue: event.target.value
        });
    }

  addTodoItem = (newItem) =>{
      console.log('message from addTodoItem');
      if(this.state.todos){
      let newData = [...this.state.todos];
      newData.unshift({id:newData.length, done: this.state.newTodoItemDone, text:this.state.newTodoItemValue});
      let options = {
        encrypt: false
      }
      this.userSession.putFile(TODOS_FILE, JSON.stringify({"data":newData}), options)
      .then(() => {
         console.log("Meeage from putFile",JSON.stringify(newData));
         this.readNotes();
      });
    }     

  }

  render() { 
    let todosarray = [];
    if (this.state.todos)
    {
      todosarray = this.state.todos;
      console.log('value of this.state.todos is not good');
    } 
   
    return (
      <div className="OptionsList container"> 
              <Grid container spacing={3}> 
                <Grid item xs={12}>         
                  <Typography variant="h5" gutterBottom color="primary">To-Dos</Typography>
                </Grid>  
                </Grid>  
                <Grid container spacing={3}> 
              <Grid item xs>              
                <TextField  id="note-title"
                fullWidth
                            label="Add Todo"                          
                            className={this.useStyles.textField}                          
                            onChange={this.handleValueChange}
                            margin="normal"
                            variant="outlined"
                            placeholder="enter to-do"
                          />
                <Button variant="contained"  onClick={this.addTodoItem} color="primary">Add </Button>            
                {/* <TodoForm addItem={this.addTodoItem} /> */}
              </Grid>  
              </Grid>  
          <div>
              {/* <Paper className={this.useStyles.paper}> */}
              {todosarray.map((item, index) => {
                return <Grid container spacing={3}    key = {item.id}>    
                      <Grid item xs={12}>
                      <Paper className={this.useStyles.paper} >  
                      <TodoListItem                
                      item={item}                   
                      index = {String(item.id)}
                      value = {item.text}
                      removeItem={this.removeItem}
                      done = {item.done}
                      markTodoDone={this.markTodoDone}/>                 
                    </Paper>              
                    </Grid>  
                    </Grid>  
               
            })} 
             <Grid container spacing={3}>    
             <Grid item xs={12}>    
                <Button variant="contained" align="center" onClick={this.removeAll}  color="secondary" className={this.useStyles.button}>Remove All</Button>                  
            </Grid>  
            </Grid>  
          </div>        
      </div>
    );
  }
}

export default TodosList
