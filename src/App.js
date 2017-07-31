import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from 'react-router-dom'
import Login from './Login/Login';
import Cart from './Cart/Cart';

import createBrowserHistory from 'history/createBrowserHistory'
const customHistory = createBrowserHistory()




class App extends Component {
  constructor(){
    super();
    console.log(localStorage.getItem('username'));
    if(localStorage.getItem('username')){
      this.state = {
        isLoggedIn: true
      }
      customHistory.push('/cart');
    } else {
      this.state = {
        isLoggedIn: false
      }
      customHistory.push('/login');
    }
  }
  componentDidMount(){
  }
  logout(){
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    this.setState({
      isLoggedIn: false
    })
    customHistory.push('/login');
  }
  render() {
      return(
        <Router history={customHistory}>
          <div>
            <ul>
              { this.state.isLoggedIn ? <li><Link to="/" onClick={this.logout.bind(this)}>Logout</Link></li> : <li><Link to="/login">Login</Link></li>}
              <li><Link to="/cart">Cart</Link></li>

            </ul>
            <Route exact path="/" component={Login}/>
            <Route path="/login" component={Login}/>
            <Route path="/cart" component={Cart} />
          </div>
        </Router>
      )
  }
}

export default App;
// <Route exact path="/" component={Cart}/>
// <Route path="/blog/:id" component={ReadBlog}/>
// <Route path="/about" component={About}/>
// <Route path="/blogs" component={CreateBlog}/>
// <Route path="/popular/posts" component={PopularPostList} />
// <Route path="/cart" component={Cart} />
