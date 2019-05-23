import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class Register extends Component {

    constructor(props) {
            super(props);
            this.onChangeEmail = this.onChangeEmail.bind(this);
            this.onChangePassword = this.onChangePassword.bind(this);
            this.onChangeUserType = this.onChangeUserType.bind(this);
            this.onSubmit = this.onSubmit.bind(this);
            // this.onClickTest = this.onClickTest.bind(this);
        
            this.state = {
                email: '',
                password: '',
                user_type: '',
                redirect: false
            }
        }
        
        onChangeEmail(e) {
            this.setState({
            email: e.target.value
            });
        }
        
        onChangePassword(e) {
            this.setState({
            password: e.target.value
            });
        }
        
        onChangeUserType(e) {
            this.setState({
            user_type: e.target.value
            });
        }
        
        onSubmit(e) {
            e.preventDefault();
            const obj = {
                email: this.state.email,
                password: this.state.password,
                userType: this.state.user_type
            };

            axios.post('http://localhost:8080/restapi_0/auth/registration', obj)
                .then( response => {
                    this.setState({ registration: response.data });
                    alert(response.data);
                })
                .catch( function(error) {
                    console.log(error);
                })
            this.setState({
            email: '',
            password: '',
            user_type: '',
            })
        }

        signupTwitch() {
            const clientId = 'zwsskesvu3e57dynyn7wigb43fqfhp';
            const redirectUri = 'localhost:3000';

            fetch('https://id.twitch.tv/oauth2/authorize?client_id=' + clientId + '&redirect_uri=' + redirectUri + '&response_type=code&scope', {
                method: 'GET',
                credentials: 'same-origin',
                headers: {'Content-Type': 'application/json'},
            })
                .then(results => {
                    return results;
                })
                .then(data => {
                    console.log(data);
                })

            // fetch('https://id.twitch.tv/oauth2/authorize?client_id=zwsskesvu3e57dynyn7wigb43fqfhp&redirect_uri=localhost:3000/register&response_type=code&scope');
        }
    

    render() {
        if ( this.state.redirect || sessionStorage.getItem('userData')) {
            return (<Redirect to={'/home'}/>)
        }
        return (
            <div className="col-6 offset-3">
                    <h3 className="mt-3 text-center" style={{ fontSize: '2.5em' }}>Register</h3>
                <div className="row">
                    <form onSubmit={this.onSubmit} className="w-100">
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                />
                        </div>

                        <div className="form-group">
                            <label>Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                />
                        </div>

                        <div className="form-group">
                            <label>User Type</label>
                            <select
                                className="form-control"
                                value={this.state.user_type}
                                onChange={this.onChangeUserType}
                                >

                                    <option value=""> -- Select User Type --</option>
                                    <option value="User">User</option>
                                    <option value="Partner">Partner</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <div className="input-group-button">
                                <a href="" className="btn btn-primary">Login</a>
                                <input type="submit" value="Register" className="btn btn-success"/>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="row">
                    <div className="container">
                    <p className="text-center">Or signup with</p>
                    <button className="btn btn-primary" onClick={this.signupTwitch}>Twitch</button>

                    </div>
                </div>
            </div>
        )
    }
}

export default Register