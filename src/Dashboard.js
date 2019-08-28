import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import OptionsList from './OptionsList';
import NotesList from './NotesList';
import TodosList from './TodosList';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { appConfig , NOTES_FILE, TODOS_FILE} from './constants'
import { UserSession } from 'blockstack'
import ClassIcon from '@material-ui/icons/Class';
import BallotIcon from '@material-ui/icons/Ballot';
import { read } from 'fs';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(4),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 200,
  },
}));

export default function Dashboard(props) {
  const  userSession = new UserSession({ appConfig })   
  const classes = useStyles();
 let   notesData;
   let todosData ;
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [values, setValues] = React.useState({
    activeItem: 'Dashboard',
    notesData: null,

  });

    
  //     notesData = readNotes();
  //   todosData = readTodos();
  //  console.log('notes = ',notesData, 'todos', todosData);
  

  function readNotes(){
    
    let options = {
      decrypt: false
    };     
    // const  userSession = new UserSession({ appConfig })   
    userSession.getFile(NOTES_FILE, options)
    .then((notesData) => {
      if(notesData) {
        console.log("message from readNotes getfile items  = ", JSON.parse(notesData));
         return JSON.parse(notesData);    
       
      };
    }).catch((error) => {
      console.error('message from read notes value of this.state.notes Error:', error);    
    });
   
  }




  function readTodos(){
    
    let options = {
      decrypt: false
    }   

    userSession.getFile(TODOS_FILE, options)
    .then((fileContents) => {
      if(fileContents) {
        console.log("message from readTodos getfile items  = ", JSON.parse(fileContents));
        return JSON.parse(fileContents);
                  
      } 
    }).catch((error) => {
      console.error('message from read Todos value of this.state.notes Error:', error);    
    });
    
  } 

function cardClicked(item){
  console.log('cardClicked ', item);
  setValues(values => ({
    ...values,          
    activeItem: item.target.id,
  }));    
}
  
function ListItemClicked(event){
  console.log('itemclicked ', event, event.target.textContent);
  setValues(values => ({
    ...values,          
    activeItem: event.target.textContent,
  }));    


}
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {values.activeItem}
          </Typography>
          <Typography component="h1" variant="caption" color="inherit" style={{marginRight:"10px"}}>
              {props.username}    
          </Typography>
          <IconButton color="inherit" onClick={props.signOut}>               
              <ExitToAppIcon />         
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={ListItemClicked}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={ListItemClicked}>
      <ListItemIcon>
        <ClassIcon />
      </ListItemIcon>
      <ListItemText primary="Notes" />
    </ListItem>
    <ListItem button onClick={ListItemClicked}>
      <ListItemIcon>
        <BallotIcon />
      </ListItemIcon>
      <ListItemText primary="Todos" />
    </ListItem>


        </List>
        <Divider />
        {/* <List>{secondaryListItems}</List> */}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
            {/* Chart */}
            <Grid item xs={12} md={8} >
              <Paper className={classes.paper} >
                {                
                  (values.activeItem === 'Dashboard')? 
                                   
                    <OptionsList type="ITEMS" click={cardClicked} currentUsername = {props.currentUsername} />
                    :
                    (values.activeItem === 'Notes')?
                      <NotesList></NotesList>
                      :
                      (values.activeItem === 'Todos')?
                      <TodosList></TodosList>
                      :
                      <OptionsList type="ITEMS" click={cardClicked}  currentUsername = {props.currentUsername}/>        
                
                }
              </Paper>
            </Grid>         
          </Grid>
        </Container>
      
      </main>
    </div>
  );
}



