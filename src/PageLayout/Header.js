import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavItem,
} from 'react-bootstrap/dist/react-bootstrap.js';

class Header extends Component{
  render(){
    return(
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">Armentum React Js Blogs</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1}><Link to="/about">About Us</Link></NavItem>
                <NavItem eventKey={1}><Link to="/blogs">Create Blog</Link></NavItem>
              </Nav>
              <Nav pullRight>
                <NavItem eventKey={1} ><Link to="/popular/posts">Popular Posts</Link></NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
    )
  }
}



export default Header;
