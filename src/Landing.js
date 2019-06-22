import React, { Component } from 'react'
import { UserSession } from 'blockstack'
import { appConfig } from './constants'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import './Landing.css'

class Landing extends Component {

  constructor() {
    super()
    this.userSession = new UserSession({ appConfig })
  }

  signIn(e) {
    e.preventDefault()
    this.userSession.redirectToSignIn()
  }


  render() {
   
    return (
      <div className="Landing">
        <div className="form-signin">
        <Grid container justify="center" alignItems="center">         
          <Avatar alt="FR" src="icon-192x192.png"  style={{margin:"10px",  width: "60", height: "60"}}/>
        </Grid>
          <h1 className="h1 mb-3 font-weight-normal">Notit</h1>
          <Button variant="contained" color="primary"   onClick={this.signIn.bind(this)}>Sign in with Blockstack           
          </Button>        
      
        </div>
      </div>
    );
  }
}

export default Landing
