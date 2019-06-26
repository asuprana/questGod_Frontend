import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import ReactDOM from 'react-dom';
// import logo from './logo.svg';
// import {Button} from 'react-bootstrap/button';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container } from 'reactstrap'
import Home from './components/home';
import Profile from './components/profile';
import Influencer from './components/influencer';
import InfluencerRegistration from './components/influencer-register';
import './App.scss';

import { GetData, getData } from './services/fetchAPI';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      userLoggedIn: false,
      existPoint: null,
    }
  }

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if (userData) {
      this.setState({ userLoggedIn: true });
      getData(`users/id/${userData.userId}`, userData.accessToken)
        .then(json => {
          this.setState({ existPoint: json.point});
        })
    }
  }
  
  render() {
    return (
      
        <div className="App">
          <header className="App-header">
            <img src={'favicon.png'} alt=""/>
            <p>{this.state.userLoggedIn? `${this.state.existPoint} Points` : ''}</p>
          </header>
          
          <div className="container mt-4">
            <Router>
              {/* <Link to={'profile'}>Profile</Link> */}
                <Switch>
                  <Route path="/" exact component={Home}/>
                  <Route path="/profile" component={Profile} />
                  <Route path="/registration" component={InfluencerRegistration}/>
                  <Route path="/influencer/:channelUrl" component={Influencer}/>
              </Switch>
            </Router>
          </div>
        </div>

    )};
}

export default App;
