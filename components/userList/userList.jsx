import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
}
from '@material-ui/core';

import {
  Link
} from 'react-router-dom';

import './userList.css';


/**
 * Define UserList, a React componment of CS142 project #5
 */


class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Item: [],
    }

    fetch('http://localhost:3000/user/list')
    .then(response => response.json())
    .then(data => this.setState({ Item: data }));
    
  }

  outOfBandJSX (){  
    var listOfnames = this.state.Item.map((name) =>
    <Link to={"/users/" + name._id} key = {name._id} style={{ textDecoration: 'none' }}>
      <ListItem>
        <ListItemText  primary = {name.first_name + " " + name.last_name} />
      </ListItem>
      </Link>

    );
    return listOfnames; 
  }



  render() {
    return (
      <div>
        <Typography variant="body1">
          THAT IS A USER LIST: 
        </Typography>
         
        <List component="nav">
          {this.outOfBandJSX()}
        </List>
      </div>
    );
  }
}

export default UserList;
