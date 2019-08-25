import React, { Component } from 'react'
//import { ITEMS, TERRITORIES } from './constants'
import './NotesList.css';
import TodoForm from './TodoForm';

import todoItems from './TodoListItem';
import TodoListItem from './TodoListItem';
//import idGenerator from 'react-id-generator';


class TodosList extends Component {
  constructor (props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.state = {todoItems: todoItems};
    this.todoItems = [];
    // this.todoItems.push({index: 1, value: "learn react", done: false});
    // this.todoItems.push({index: 2, value: "Go shopping", done: true});
    // this.todoItems.push({index: 3, value: "buy flowers", done: true});
  }
  addItem(newItem) {
    console.log('msg from addItem', newItem);
    this.todoItems.unshift({
      index: this.todoItems.length, 
      value: newItem.newItemValue, 
      done: false
    });
    this.setState({todoItems: this.todoItems});
  }
  removeItem (itemIndex) {
    console.log('msg from removeItem', itemIndex);
    this.todoItems.splice(itemIndex, 1);
    this.setState({todoItems: this.todoItems});
  }
  markTodoDone(event) {
    console.log('msg from markTodoDone', event);
    var todo = this.todoItems[event.target.value];
    //this.todoItems.splice(event.target.value, 1);
    todo.done = !todo.done;
    this.todoItems[event.target.value] = todo;
  //  todo.done ? this.todoItems.push(todo) :this.todoItems.unshift(todo);
    this.setState({todoItems: this.todoItems});  
  }
  render() {
    return (
      <div id="main">
        <h2>To Do List</h2>
        <div style={{width:"100%"}}>
            
            {this.todoItems.map((item) => {
            return <TodoListItem
            item={item}
            key = {item.index}
            index = {item.index}
            value = {item.value}
            removeItem={this.removeItem}
            done = {item.done}
            markTodoDone={this.markTodoDone}/>

            })} 
          
          </div>
         {/* <TodosList items={this.todoItems} removeItem={this.removeItem} markTodoDone={}/> */}
         <TodoForm addItem={this.addItem} />
      </div>
    );
  }
}

export default TodosList


