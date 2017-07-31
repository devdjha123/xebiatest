import React, { Component } from 'react';
import {
  FormGroup,
  Button,
  ControlLabel,
  FormControl,
  HelpBlock
} from 'react-bootstrap/dist/react-bootstrap.js';

import config from '../config';
import createBrowserHistory from 'history/createBrowserHistory'
require('./Login.css')
const customHistory = createBrowserHistory()


class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }
  componentDidMount(){
    var that = this;
    // this.getPeopleList()
    // .then(function( response ){
    //   if (response.ok) {
    //     response.json().then(json => {
    //         that.setState({
    //           people: json.results
    //         })
    //     });
    //   }
    // })
    // .catch(function( err ){
    //   console.log('err:- ', err);
    // })
  }

  _changeUsername(e){
    this.setState({
      username: e.target.value
    })
  }
  _changePassword(e){
    this.setState({
      password: e.target.value
    })
  }
  _onSubmit(event){
    event.preventDefault();
    console.log('login called', this.state.username);
    if(this.state.username && this.state.password){
      localStorage.setItem('username', this.state.username);
      localStorage.setItem('password', this.state.password);
      this.props.history.push('/cart')
    } else {
      console.log('please enter email and password field');
    }
  }


  render(){
    return(
      <form onSubmit={this._onSubmit.bind(this)}>
        <FieldGroup
          id="formControlsText"
          label="Username"
          type="text"
          value={this.state.username}
          onChange={this._changeUsername.bind(this)}
          placeholder="Enter Username"
        />
        <FieldGroup
          id="formControlsPassword"
          label="Password"
          type="password"
          value={this.state.password}
          onChange={this._changePassword.bind(this)}
          placeholder="Enter password"
        />
        <Button type="submit">
          Submit
        </Button>
    </form>
    )
  }
}

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}


export default Login;
