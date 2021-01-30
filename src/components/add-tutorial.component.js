import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

import { TextField, Button, withStyles } from "@material-ui/core";
import { styles } from "../css-common";

class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      published: false,
      submitted: false
    };
  }

  onChangeTitle(e){
    this.setState({
      title: e.targe.value
    });
  }

  onChangeDescription(e){
    this.setState({
      description: e.target.value
    });
  }

  saveTutorial() {
  var data = {
    title: this.state.title,
    description: this.state.description
  };

  TutorialDataService.create(data)
    .then(response => {
      this.setState({
        id: response.data.id,
        title: response.data.title,
        description: response.data.description,
        published: response.data.published,
        submitted: true
      });
      console.log(response.data);
    }).catch (e=> {
      console.log(e);
    });
  } 
  newTutorial() {
    this.setState({
      id: null,
      title: "",
      description: "",
      published: false,
      submitted: false
    });
  }

  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        {this.state.submitted ? (
          <div className = {classes.form}>
            <h4>You Submitted succesfully!</h4>
            <Button
              size="small"
              color="primary"
              variant="contained"
              onClick={this.newTutorial}>
                Add
              </Button>
          </div>
        ) : (
          <div className={classes.form}>
            <div className={classes.textField}>
              <TextField
                label="title"
                name="title"
                value={this.state.title}
                onChange={this.onChangedTitle}
                required/>
            </div>
            <div className={classes.textField}>
              <TextField
                label = "Description"
                name="description"
                value={this.state.description}
                onChange={this.onChangeDescription}
                required
                />
            </div>
            <Button
              size="small"
              color="primary"
              variant="contained"
              onClick={this.saveTutorial}>
                Submit
              </Button>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AddTutorial)