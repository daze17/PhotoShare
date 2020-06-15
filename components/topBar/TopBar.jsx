import React from "react";
import { AppBar, Toolbar, Typography, FormHelperText, Button } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import "./TopBar.css";
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from "@material-ui/core/FormControlLabel";

const styles = theme => ({
  root: {
    flexGrow: 1,
    
  },
  userDetail: {
    marginLeft: "30px",
    fontSize: "25"
  },
  haha: {
    alignItems: 'flex-end',
  }
  
});

/**
 * Define TopBar, a React componment of CS142 project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems123: [],
      itemChecked: {}
    }
  }
  

  render() {
    var name;
    var page;
    const { classes } = this.props;
    if (window.location.href.slice(40, 45) === "users") {
      

      fetch("http://localhost:3000/user/" + window.location.href.slice(46, 70))
        .then(response => response.json())
        .then(data => this.setState({ listItems123: data }));
      name = this.state.listItems123.first_name;

      page = "User detail of ";
    } else if (window.location.href.slice(40, 45) === "photo") {
      name = window.cs142models.userModel(window.location.href.slice(47, 71)).first_name;

      fetch("http://localhost:3000/user/" + window.location.href.slice(47, 71))
        .then(response => response.json())
        .then(data => this.setState({ listItems123: data }));

      name = this.state.listItems123.first_name;

      page = "Photos of  ";
    } else {
      page = "User list ";
      name = "";
    }
    return (
      <div  className={classes.root}>
      <AppBar className={classes.haha} position="absolute">
          
          <Toolbar>
          <FormControlLabel
            value="end"
            control={<Checkbox  
            value="secondary"
           /> }
            label={<Typography  color="white"><p>Enable</p></Typography>}
            
          />


            <Typography variant="h5" color="inherit">
              Bilguun
            </Typography>
            
            
          <Typography className={classes.userDetail} >{page + " " + name}</Typography>
          
          </Toolbar>
        </AppBar>
        </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TopBar);
