import React, {Component} from 'react';
import {
  Grid,
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap/dist/react-bootstrap.js';
class Footer extends Component {
  render(){
    const footerSection ={
      padding: 100
    }
    return(
      <div style={footerSection}>
        <Grid>
         <Row className="show-grid">
           <Col xs={6} md={4}><code>
             <Image src="http://localhost:8080/Blog_Map.jpg" responsive />
           </code></Col>
           <Col xs={6} md={4}><code>
             <h3>Quick Links</h3>
               <ListGroup>
                <ListGroupItem href="#link1">Existing Members? Login </ListGroupItem>
                <ListGroupItem href="#link2">Blogs</ListGroupItem>
                <ListGroupItem href="#link2">Webinars</ListGroupItem>
              </ListGroup>
           </code></Col>
           <Col xsHidden md={4}><code>
             <h3>Download Free E-Book</h3>
           </code></Col>
         </Row>
         <footer>Copyright &copy; Hemant Nagarkoti</footer>
       </Grid>
      </div>
    )
  }
}

export default Footer;

// <footer>Copyright &copy; Hemant Nagarkoti</footer>
