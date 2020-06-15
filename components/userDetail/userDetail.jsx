import React from 'react';
import {
  Typography
} from '@material-ui/core';

import {
  Link
} from 'react-router-dom';
import Button from '@material-ui/core/Button';


import './userDetail.css';


/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItem: []
    }
  }
  detailer(){

    fetch('http://localhost:3000/user/'+this.props.match.params.userId)
    .then(response => response.json())
    .then(data => this.setState({ listItem: data }));
    var listItems = this.state.listItem;
    
    return(
      <div>
        <Typography color="default" variant="h3" align="center">User Detail</Typography>
        <Typography color="default" variant="h6" >Name :  {listItems.first_name + " "+ listItems.last_name}</Typography>
        <Typography color="default" variant="h6" >Location : {listItems.location}</Typography>
        <Typography color="default" variant="h6" >Description : {listItems.description}</Typography>
        <Typography color="default" variant="h6" >Occupation : {listItems.occupation}</Typography>
        
        <Link to={"/photos/" +  this.props.match.params.userId}> 
          
          <Button variant="outlined" color="primary">
            Photos
          </Button>
        </Link>
      </div>
    )}

  render() {
    return (
      <div> 
       {this.detailer()}
     </div>
    );
  }
}

export default UserDetail;
