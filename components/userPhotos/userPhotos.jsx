import React from 'react';
import {
  Typography
} from '@material-ui/core';
import './userPhotos.css';

import Card from '@material-ui/core/Card';


import CardContent from '@material-ui/core/CardContent';

import Button from '@material-ui/core/Button';




/**
 * Define UserPhotos, a React componment of CS142 project #5
 * window.cs142models.photoOfUserModel(userId): 
 * {this.props.match.params.userId}
 */


class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {activeStep : 0,
    lim: 0,
    listItems123: []}

    fetch('http://localhost:3000/photosOfUser/'+this.props.match.params.userId)
    .then(response => response.json())
    .then(data => this.setState({ listItems123: data }));
    

  }


  CommentSec(comments){
    var pComment = comments.map((comm) =>
      <CardContent key = {comm._id}>
        <Typography gutterBottom variant="h6" align="left" color="primary"> 
          {comm.user.first_name + " " + comm.user.last_name}
        </Typography>
        <Typography>
          {comm.comment}
        </Typography>
        <Typography color="textSecondary" align="right"> 
            {comm.date_time}  
        </Typography>
      </CardContent>
    )
    return pComment
  }



  PhotoDetailer(){
    
    var listItems  = this.state.listItems123;
    var listOfPhoto = listItems.map((photo) =>
     <Card key = {photo._id} className = "pPhoto">
        <CardContent>
          <img src={"http://localhost:3000/images/" + photo.file_name }></img>
        </CardContent>
        <CardContent>
          <Typography  align="right"  color="textSecondary">
              Uploaded : {photo.date_time}
          </Typography> 
          {(typeof photo.comments !== "undefined") ? this.CommentSec(photo.comments) : console.log(typeof photo.comments)}
        </CardContent>      
    </Card>
    
    );
    return listOfPhoto;
  }



  PhotoD(){

    var listes = this.PhotoDetailer();
    return listes[this.state.activeStep];

  }
  
  handleNext = () => {
    var listes = this.PhotoDetailer();
    var count = 0;
    var i;
    for (i in listes) {
    if (listes.hasOwnProperty(i)) {
        count++;
    }
    
  }
  console.log(count);
    if(count-1 !== this.state.activeStep)
      this.setState((state) => ({ activeStep: state.activeStep + 1}));
  };

  handleBack = () => {
    if(0 !== this.state.activeStep)
      this.setState((state) => ({ activeStep: state.activeStep - 1}));
  };

  render() {
    return (
      <div> 
              <Button    color="primary"  onClick={this.handleBack} >
                Back
              </Button >
              <Button  color="primary" onClick={this. handleNext}>
                Next
              </Button>
        {this.PhotoD()}
      </div>
    );
  }
}

export default UserPhotos;
