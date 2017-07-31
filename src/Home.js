import React, { Component } from 'react';

import './App.css';
import config from './config.js';
import Header from './PageLayout/Header';
import Footer from './PageLayout/Footer';

import BlogRow from './Blogs/BlogRow';

import {
  Pagination
} from 'react-bootstrap/dist/react-bootstrap.js';

class Home extends Component{
  constructor(){
    super();
    this.state = {
      blogList: [],
      blogListArr:[],
      activePage:1,
      maxButtons: 1
    }
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(eventKey) {
    var that = this;
    var no_of_items = eventKey*3;
    var sliced_arr = this.state.blogListArr;
    sliced_arr = sliced_arr.slice(0, no_of_items);
    this.setState({
      activePage: eventKey,
      blogList: sliced_arr
    });

  }
  componentDidMount(){
    var that = this;
    that.getBlogs()
    .then(function( response ){
      if (response.ok) {
        response.json().then(json => {
          var len = json.data.length;
          len = Math.round(len/3);
          var data = json.data.slice(0,3);
            that.setState({
              blogList: data,
              blogListArr: json.data,
              maxButtons: len
            })
        });
      }
    })
    .catch(function( err ){
      console.log('err:- ', err);
    })
  }
  getBlogs(){
    return fetch( config.host + config.middleware + '/blogs', {
        // mode:'no-cors',
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
  }
  render(){
    var that = this;
    if(that.state.blogList.length){
      return(
        <div >
          <div >
            {/* Header part */}
              <Header />
            {/* Header part */}


          {/* Rendering Rows for blogs based upon for loop as written above*/}
           <BlogRow items={that.state.blogList}/>
          {/* Rendering Rows for blogs based upon for loop as written above*/}


          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            items={4}
            maxButtons={4}
            activePage={this.state.activePage}
            onSelect={this.handleSelect} />

          {/* Footer part */}
            <Footer />
          {/* Footer part */}
          </div>
        </div>
      )
    } else {
      return(
        <div>
          {/* Showing Loading Screen or Spinner until items are not loaded or fetched from server */}
          <h1>Loading . . .</h1>
        </div>
      )
    }
  }
}

export default Home;
