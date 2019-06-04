import React, { Component } from 'react'
//import { ITEMS, TERRITORIES } from './constants'
import './NotesList.css';
import TodoForm from './TodoForm';

import todoItems from './TodoListItem';
import TodoListItem from './TodoListItem';
import idGenerator from 'react-id-generator';


class TodosList extends React.Component {
  constructor (props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.state = {todoItems: todoItems};
    this.todoItems = [];
this.todoItems.push({index: 1, idGenerator(): "learn react", done: false});
this.todoItems.push({index: 2, idGenerator(): "Go shopping", done: true});
this.todoItems.push({index: 3, idGenerator(): "buy flowers", done: true});
  }
  addItem(newItemValue) {
    console.log('msg from addItem', newItemValue);
    this.todoItems.unshift({
      index: this.todoItems.length+1, 
      value: newItemValue, 
      done: false
    });
    this.setState({todoItems: this.todoItems});
  }
  removeItem (itemIndex) {
    console.log('msg from removeItem', itemIndex);
    this.todoItems.splice(itemIndex, 1);
    this.setState({todoItems: this.todoItems});
  }
  markTodoDone(itemIndex) {
    console.log('msg from markTodoDone', itemIndex);
    var todo = this.todoItems[itemIndex];
    this.todoItems.splice(itemIndex, 1);
    todo.done = !todo.done;
    todo.done ? this.todoItems.push(todo) :this.todoItems.unshift(todo);
    this.setState({todoItems: this.todoItems});  
  }
  render() {
    return (
      <div id="main">
        <h2>To Do List</h2>
        <div style={{width:"80%", marginLeft:"10%", marginRight:"10%"}}>
            
            {this.todoItems.map((item, index) => {
            return <TodoListItem
            item={item}
            key = {item.index}
            removeItem={this.removeItem}
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


