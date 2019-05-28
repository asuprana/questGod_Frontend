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

        const config = {
          'method' : 'GET',
          // 'Authorization': 'Bearer ' + userData.token
          'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhcnRuZXJAZW1haWwuY29tIiwidXNlcklkIjoiNWNkNGZlZGViMWMyZTQxODI0OTliMmRmIiwidXNlclR5cGUiOiJQYXJ0bmVyIiwiaWF0IjoxNTU3NDYzNzg3LCJleHAiOjE1NjYxMDM3ODd9.xQMrZj_sy0tTGRDT1m67YRDHiOBrz5ZUDWASfAm7ODk'
        }

        // fetch("http://localhost:8080/restapi_0/products", config)
        //   .then( results => {
        //     return results.json();
        //   })
        //   .then( data => {
        //     console.log(data);
        //   })
          
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

            <div id="content-slider" class="content-slider">
              <div className="slider-item">
                <div className="content">
                  <img src="https://i.ytimg.com/vi/Kt4fhvkslQU/maxresdefault.jpg"/>

                </div>
              </div>

              <div className="slider-item">
                <div className="content">
                  <img src="https://png.pngtree.com/thumb_back/fw800/back_pic/00/10/02/03563189964cf72.jpg"/>

                </div>
              </div>

              <div className="slider-item">
                <div className="content">

                  <img src="https://www.celjaded.com/wp-content/uploads/2016/08/CelJaded-Gears-of-War-The-Board-Game-Retrospective-Banner.jpg"/>
                </div>
                
              </div>

              <div className="slider-item">
                <div className="content">
                  <img src="https://png.pngtree.com/thumb_back/fw800/back_pic/00/03/70/09561f676c878ce.jpg"/>

                </div>
              </div>

              {/* <div className="slider-item">
                <img src="https://s3.amazonaws.com/htw/dt-contest-entries/08081e9c84813c8b1a4c23b161016734.png"/>
              </div> */}
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
