import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {Redirect} from 'react-router-dom';

import Register from './components/register';
import Login from './components/login';
import Home from './components/home';
import AddNewProduct from './components/add-product';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      login: false
    }

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    if (sessionStorage.getItem('userData')) {
      this.setState({login:true});
    }
  }

  
  logout() {
    sessionStorage.setItem('userData', '');
    sessionStorage.clear();
    return (<Redirect to={'/login'}/>)
  }
  render() {
    const home = (
      <div className="row nav-group w-100">
          <ul className="navbar-nav">

            <li className="nav-items">
              <Link to={'/home'} className="nav-link">Home</Link>
            </li>
            <li className="nav-items">
              <Link to={'/product/add'} className="nav-link">Create Product</Link>
            </li>

          </ul>

          <ul className="navbar-nav">
            <li className="nav-items">
              <Link to={'/login'} className="nav-link btn btn-danger" onClick={this.logout}>Log out</Link>
            </li>
          </ul>
      </div>
    );
    
    const login = (
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-items">
            <Link to={'/register'} className="nav-link">Register</Link>
          </li>

          <li className="nav-items">
            <Link to={'/login'} className="nav-link">Login</Link>
          </li>
        </ul>
      </div>
    )
   
    return (
      
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5">
            <Link to={'/'} className="navbar-brand">Quest God</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            </button>

            
            <div className="collapse navbar-collapse" id="navbarNav">
              {this.state.login ? home:login}
            </div>

            
          </nav>

          <div className="container-fluid">
            <Switch>
              <Route exact path="/register" component={ Register } />
              <Route path="/login" component={ Login } />
              <Route path="/home" component={ Home } />
              <Route path="/product/add" component={ AddNewProduct } />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
