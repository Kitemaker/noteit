import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { UserSession } from 'blockstack'
import { appConfig } from './constants'


const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url("./backgroundsblankblue.jpg")',
    backgroundRepeat: 'repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),  
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    avatar: {
        margin: 10,
      },
      bigAvatar: {
        margin: 0,
        width: 1000,
        height: 100,
      },
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();

  function signIn(e) {
    e.preventDefault()
    let userSession = new UserSession({ appConfig })
    userSession.redirectToSignIn()
  }

  return (
    <Grid container component="main" className={classes.root}>
    <CssBaseline />
    <Grid item xs={false} sm={4} md={7} className={classes.image} />
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
      <Avatar alt="N" src="/notit.png" className={classes.bigAvatar} />
        <Typography variant="h4" gutterBottom>
          Notit
        </Typography>
        <form className={classes.form} noValidate>            
       
        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit} onClick={signIn}>
                Sign in with Blockstack         
          
          </Button>
          <Grid container>             
            <Grid item>
              <Link href="https://browser.blockstack.org/" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}>          
          </Box>
        </form>
      </div>
    </Grid>
  </Grid>
  );
}