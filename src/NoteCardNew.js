import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  card: {
    minWidth: 275,
    color:"primary",
    background:'lightyellow',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  
  title: {
    fontSize: 14,
  },
  pos: {   
    margin: 10,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles(); 

  return (
 
    <Card className={classes.card} raised="true">
      <CardContent>        
        <Typography variant="h5" component="h2">
        {props.title}       
        </Typography>       
        <Typography variant="body2" component="p">
         {props.value}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={props.click} color="secondary">Remove</Button>
      </CardActions>
    </Card>
  
  );
}
