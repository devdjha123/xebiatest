import React, { Component } from 'react';
import {
  Col,
  Row,
  Image,
  Grid,
  Pager,
  Panel,
  Navbar,
  FormGroup,
  FormControl,
  Button,
  Nav,
  NavItem
} from 'react-bootstrap/dist/react-bootstrap.js';

import config from '../config';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      people: [],
      page: 1,
      searchVal: ''
    }

  }
  componentDidMount(){
    var that = this;
    if(!localStorage.getItem.username && !localStorage.getItem('password')){
      this.props.history.push('/login');
    } else {
      console.log(localStorage.getItem('username'));
      this.getPeopleList()
      .then(function( response ){
        if (response.ok) {
          response.json().then(json => {
              that.setState({
                people: json.results
              })
          });
        }
      })
      .catch(function( err ){
        console.log('err:- ', err);
      })
    }

  }
  loadPage(){

  }
  getPeopleList(){
    return fetch( config.baseUrl + config.people, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
  }
  previousPage(){
    var that = this;
    if(this.state.page > 1){
      var pageNo = this.state.page - 1;
      this.setState({
        page: pageNo
      });
      var arr = this.state.people;
      arr.splice(-10, 10);
      setTimeout(function(){
        that.setState({
          people: arr
        })
      }, 200);
    }
  }
  nextPage(){
    var that = this;
    var pageNo = this.state.page + 1;
    this.setState({
      page: pageNo
    });
    var url = config.baseUrl + config.people;
    setTimeout(function(){
      url = url + '&page='+that.state.page;
      that.loadMore(url)
      .then(function(response){
        if (response.ok) {
          response.json().then(json => {
            var arr = that.state.people;
            var arr1 = json.results;
            arr.concat(arr1);
                that.setState({
                    people: that.state.people.concat(json.results)
                })
          });
        }
      })
    },500);
  }
  loadMore( url ){
    return fetch( url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
  }
  loadScreen(){
    return(
      <div>Loading...</div>
    )
  }
  handleSearch(event) {
    var that = this;
    event.preventDefault();
    var text = event.target.value;
    that.setState({searchVal: event.target.value});
    that.debounce( that._searchBar(text, that), 500 )
  }
  _searchBar = function( text, context ){
    var that = context;
    console.log('_searchBar called',text);
    var url = config.baseUrl + config.people;
    url = url + '&search=' + text
    that.loadMore(url)
    .then(function( response ){
      if (response.ok) {
        response.json().then(json => {
          console.log('coming', json.results)
          if(json.results.length){
            that.setState({
              people: json.results
            })
          } else {
            that.setState({
              people: [1]
            })
          }
        });
      }
    })
  }
  debounce( fn, delay ){
    var lastCallingTime, stoHandle;
    stoHandle = setTimeout( fn, delay );
    lastCallingTime = Date.now();
    return function(){
      if( (Date.now() - lastCallingTime) < delay ){
        clearTimeout(stoHandle);
      }
    }
  }

  renderList(){
    console.log(this.state.people);
    var items = this.state.people;
    return(
      <div>
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">People</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl type="text" placeholder="Search" ref="search" value={this.state.searchVal} onChange={this.handleSearch.bind(this)}/>
            </FormGroup>
            {' '}
          </Navbar.Form>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">Link Right</NavItem>
            <NavItem eventKey={2} href="#">Link Right</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
        <InflexibleListRender list={items} />
        <Pager>
          <Pager.Item onClick={this.previousPage.bind(this)}>Previous</Pager.Item>
          {' '}
          <Pager.Item onClick={this.nextPage.bind(this)}>Next</Pager.Item>
        </Pager>
      </div>
    )
  }
  render(){
    if(this.state.people.length){
      return this.renderList()
    } else {
      return this.loadScreen();
    }
  }
}

var InflexibleListRender = React.createClass({
    render: function() {
      var that = this;
      console.log(that.props.list[0].name);
      return (
          <Grid>
          {
            that.props.list.map( function(val, index, arr){
              return(
                  <Row className="show-grid" key={index}>
                    <div>
                      <Panel header={that.props.list[index].name}>
                        { that.props.list[index].gender ? <p>Gender: { that.props.list[index].gender }</p> : ''}
                        { that.props.list[index].height ? <p>Height: { that.props.list[index].height }</p> : ''}
                        { that.props.list[index].birth_year ? <p>Birth Year: { that.props.list[index].birth_year }</p> : ''}
                        { that.props.list[index].eye_color ? <p>Eye Color: { that.props.list[index].eye_color }</p> : ''}
                        { that.props.list[index].skin_color ? <p>Skin Color: { that.props.list[index].skin_color }</p> : ''}
                        { that.props.list[index].mass ? <p>Mass: { that.props.list[index].mass }</p> : ''}

                        { that.props.list[index].vehicles ? <p>Vechicles: { that.props.list[index].vehicles.join(', ') }</p> : ''}
                        { that.props.list[index].starships ? <p>Starships: { that.props.list[index].starships.join(', ') }</p> : ''}
                        { that.props.list[index].films ? <p>Films: { that.props.list[index].films.join(', ') }</p> : ''}

                        { that.props.list[index].created ? <p>Created At: { that.props.list[index].created }</p> : ''}

                      </Panel>
                    </div>
                  </Row>
              )
            })
          }
        </Grid>
      )
    }
  });


export default Cart;
