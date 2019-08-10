import React, { Component } from 'react'

import { UserSession } from 'blockstack'
import Dashboard from './Dashboard'

import { appConfig, ME_FILENAME } from './constants'
import './SignedIn.css'
import NotesList from './NotesList';
import TodosList from './TodosList';


class SignedIn extends Component {

  constructor(props) {
    super(props)
    this.userSession = new UserSession({ appConfig })
    this.state = {   
      savingMe: false,   
    } 
    this.signOut = this.signOut.bind(this)
  }

  signOut(e) {
    console.log('message from signOut');
    e.preventDefault()
    this.userSession.signUserOut()
    window.location = '/'
  }

  render() {
    const username = this.userSession.loadUserData().username
    const me = this.state.me   
    
    return (
      <div className="SignedIn">
        <Dashboard currentUsername={username} signOut={this.signOut}></Dashboard>   
      </div>
    );
  }
}

export default SignedIn
