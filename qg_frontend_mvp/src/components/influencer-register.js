import React, {Component} from 'react';
import '../assets/css/influencer-register.scss';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { postData, getData, updateData, register} from '../services/fetchAPI';

export default class InfluencerRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerSuccess: false,
            email: '',
            password: '',
        }
        this.onSubmitRegistration = this.onSubmitRegistration.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    // onChangeForm(e) {
    //     console.log(e.target.value);
    //     console.log(e.target.id);
    //     var key = e.target.id;
        
    //     this.setState({
            
    //     })
    // }

    onSubmitRegistration(e) {
        e.preventDefault();
        register('auth/influencerregistration', this.state.email, this.state.password)
            .then(json => {
                if (json.ok) {
                    this.setState({
                        registerSuccess: true
                    })
                }
            }) 
    }

    render() {
        return(
            <Container className="register">
                <h2>Influencer Registration</h2>
                <Form onSubmit={this.onSubmitRegistration}>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" placeholder="Email" onChange={this.onChangeEmail}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Password" onChange={this.onChangePassword}/>
                    </FormGroup>

                    <Button color="primary">Register</Button>
                </Form>
                {this.state.registerSuccess ? <Alert color="success">Registration success</Alert> : <div></div>}
            </Container>
        )
    }
}

