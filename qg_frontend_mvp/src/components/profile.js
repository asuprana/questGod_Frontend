import React, {Component} from 'react';
import '../assets/css/profile.scss';
import { Row, Col, Progress } from 'reactstrap';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import {GoogleAuthentication} from '../services/authentication';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            userData: '',
            userLoggedIn: false,
            userName: '',
            userEmail: '',
            userAvatar: '',
            userId: '',
            userAccessToken: '',
            userPassword: '',
            userGoogleId: '',
        }

        this.userRegistration = this.userRegistration.bind(this);
    }

    userLogOut() {
        localStorage.clear();
    }

    twitchLogin() {
        const baseURL = 'https://api.twitch.tv/kraken/oauth2/authorize?response_type=token&client_id=zwsskesvu3e57dynyn7wigb43fqfhp';

            axios.post(baseURL)
            .then((responseJson) => {
                console.log(responseJson);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    componentDidMount() {
        const userData = localStorage.getItem('userData');
        
        if (userData) {
            this.setState({ userData: JSON.parse(userData)});
            this.setState({ userLoggedIn: true });
        }
    }

    userRegistration(response) {
        GoogleAuthentication(response);
    }

    render() {
        let images_array = [
            '001-order',
            '002-chest',
            '003-achievement',
            '004-inventory',
            '005-chest-1',
            '006-inventory-1',
            '007-microtransactions',
            '008-chest-2',
            '010-vending-machine',
            '011-chest-3' 
        ];

        let badges_array = [
            '001-order',
            '002-chest',
            '003-achievement',
            '004-inventory',
            '005-chest-1',
        ];

        let images = images_array.map( image => {
            return <li key={image}><img src={`icon/${image}.png`} alt=""/></li>
        });
        
        let badges = badges_array.map( badge => {
            return <li key={badge}><img src={`icon/${badge}.png`}/></li>
        });

        const welcomeUser = (
            <p>
                logged in as, {this.state.userData.email}. <a href="" onClick={this.userLogOut}>Log out</a>
            </p>
        );
        
        return(
            <div className="container-fluid profile">
                <Row>
                    <Col xs="3" sm="4" md="2" className="p-0">
                        <div className="profile-picture">
                            <img src=
                                {this.state.userLoggedIn? this.state.userData.avatar : 'images/pp2.png'}
                            />
                        </div>
                    </Col>

                    <Col xs="9" sm="8" md="5">
                        <h2>{this.state.userLoggedIn? this.state.userData.name : 'Name'}</h2>
                        <p>Level ## [Medal-Granted-Title]</p>
                        <div className="xp-bar">
                            <Progress animated color="success" value="70" className="xp-bar-inner">70/100</Progress>

                        </div>
                    </Col>

                    <Col className="button-auth" xs="12" sm="12" md="5">
                        
                        {this.state.userLoggedIn? welcomeUser : <p>Link accounts to unlock features and more quest types!</p>}
                        <button className="steam">
                            <img src={'images/steam-icon.png'}/>
                            <p>Steam</p>
                        </button>

                        <button className="twitch" onClick={this.twitchLogin}>
                            <img src={'images/twitch-icon.png'}/>
                            <p>Twitch</p>
                        </button>

                        <GoogleLogin
                            clientId="539105602259-o3tjmif4f2rnbldd5hve00td1ckjaosm.apps.googleusercontent.com"
                            render = {renderProps => (
                                <button className="google" onClick={renderProps.onClick}>
                                    <img src={'images/google-icon.png'}/>
                                    <p>Google</p>
                                </button>
                            )}
                            onSuccess={this.userRegistration}
                            onFailure={this.userRegistration}
                            cookiePolicy={'single_host_origin'}
                        />

                        <button className="facebook">
                            <img src={'images/facebook-icon.png'}/>
                            <p>Facebook</p>
                        </button>
                    </Col>
                </Row>

                <Row className="mt-5">
                    <Col className="season-1" md="4">
                        <h3>Season 1 Medals</h3>
                        <Row>
                            <Col xs="4" md="auto">
                                <img src={'/images/pp.png'} className="col-xs-p-0 logo"/>
                            </Col>

                            <Col xs="8" md="auto">
                                <h3 className="medals-title">"The Gold Hunter"</h3>
                                <div className="badge">
                                    {badges}
                                </div>
                            </Col>
                        </Row>
                    </Col>

                    <Col className="badge-list" md="8">
                        <h3 class="badge-list-title">Type A (just many many icons)</h3>

                        <div className="badge-list-content">
                            {images}
                            {images}
                            {images}
                            {images}
                            {images}
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Profile;