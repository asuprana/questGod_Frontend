import React, { Component } from 'react';
import {PostData} from '../services/PostData';
import '../App.css';
import {Redirect} from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirect: false,
            loginSuccess: false,
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeForm(e) {
        this.setState({[e.target.name]: e.target.value});
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

    onSubmit(e) {
        e.preventDefault();

        PostData('auth/authentication', this.state)
            .then((result) => {
                const responseJSON = result;

                if (responseJSON.status === 200) {
                    const userData = {
                        email: this.state.email,
                        password: this.state.password,
                        token: responseJSON.data.token
                    }

                    // console.log(userData);
                    sessionStorage.setItem('userData', JSON.stringify(userData));
                    this.setState({
                        redirect: true,
                        loginSuccess: true,
                    });
                } else {
                    console.log('login error');
                }
            });          

    }

        render() {
            if ( this.state.redirect || sessionStorage.getItem('userData') ) {
                return (<Redirect to={'/home'}/>)
            }

            const loginSuccess = (
                <div className="alert alert-success">
                    <strong>Login success!</strong>
                </div>
            )

            // if ( sessionStorage.getItem('userData') ) {
            //     return (<Redirect to={'/home'})
            // }
            return (
                <div className="mt-5 user-auth">
                
                <div className="row">
                    {this.state.userData && this.state.userData.map(response => (
                        <p>{response.token}</p>
                    ))}
                </div>

                <h3 className="mt-3 text-center" style={{ fontSize: '2.5em' }}>Login</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            value={this.state.email}
                            // onChange={this.onChangeForm}
                            onChange={this.onChangeEmail}
                            />
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={this.state.password}
                            // onChange={this.onChangeForm}
                            onChange={this.onChangePassword}
                            />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-success"/>
                    </div>
                </form>

                {this.state.loginSuccess? loginSuccess : <div></div>}

                

            </div>

            )
        }

}

export default Login