import React, { Component } from 'react';
import './TodosList.css';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

class TodoListItem extends Component {
    constructor(props) {
      super(props);
      this.onClickClose = this.onClickClose.bind(this);
      this.onClickDone = this.onClickDone.bind(this);
    }
    onClickClose() {
      var index = parseInt(this.props.index);
      this.props.removeItem(index);
    }
    onClickDone() {
      var index = parseInt(this.props.index);
      this.props.markTodoDone(index);
    }
    render () {
      var todoClass = this.props.item.done ? 
          "done" : "undone";
      return(
        <li className="list-group-item ">
          <div className={todoClass}>
            {/* <span className="glyphicon glyphicon-ok icon" aria-hidden="true" onClick={this.onClickDone}></span> */}
            <Checkbox 
            id = {this.props.index}
            checked={this.props.done}  onChange={this.props.markTodoDone}
            value={this.props.index}
            inputProps={{'aria-label': 'primary checkbox',}}
            />
            <Typography variant="body" color="primary">  {this.props.item.text}</Typography>
          
            <button type="button" className="close" onClick={this.onClickClose}>&times;</button>
          </div>
        </li>     
      );
    }
  }

export default TodoListItem;