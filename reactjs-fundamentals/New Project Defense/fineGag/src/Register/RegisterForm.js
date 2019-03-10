import React, {Component} from "react";
import {Button, Col, Form, FormFeedback, FormGroup, FormText, Input, Label} from "reactstrap";

class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'username': '',
            'email': '',
            'password': '',
            'confirmPassword': '',
            validate: {
                usernameState: '',
                emailState: '',
                passwordState: '',
                confirmPasswordState: '',
            },
        }
    }

    handleChange = (event) => {
        const {target} = event;
        const value = target.value;
        const {name} = target;

        this.setState({
            [name]: value,
        });
    };

    validateUsername(e) {
        const {validate} = this.state;
        if (e.target.value.length >= 6) {
            validate.usernameState = 'has-success'
        } else {
            validate.usernameState = 'has-danger'
        }
        this.setState({validate})
    }


    validateEmail(e) {
        const emailRex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/;
        const {validate} = this.state;
        if (emailRex.test(e.target.value)) {
            validate.emailState = 'has-success'
        } else {
            validate.emailState = 'has-danger'
        }
        this.setState({validate})
    }

    validatePassword(e) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[0-9]).{6,}$/;
        const {validate} = this.state;
        if (passwordRegex.test(e.target.value)) {
            validate.passwordState = 'has-success'
        } else {
            validate.passwordState = 'has-danger'
        }
        this.setState({validate})
    }

    validateConfirmPassword(e) {
        const {validate} = this.state;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[0-9]).{6,}$/;
        if (passwordRegex.test(e.target.value) && e.target.value === this.state.password) {
            validate.confirmPasswordState = 'has-success'
        } else {
            validate.confirmPasswordState = 'has-danger'
        }

        this.setState({validate})
    }

    render() {
        const {username, email, password, confirmPassword} = this.state;
        return (

            <Form className="form-control-lg" onSubmit={
                (e) => {
                    e.validate = this.state.validate;
                    this.props.registerFormSubmit(e);
                }}>
                <Col sm="12" md={{size: 6, offset: 3}}>
                    <FormGroup>
                        <Label>Username</Label>
                        <Input
                            type="text"
                            name="username"
                            placeholder="John_Doe"
                            value={username}
                            valid={this.state.validate.usernameState === 'has-success'}
                            invalid={this.state.validate.usernameState === 'has-danger'}
                            onChange={(e) => {
                                this.validateUsername(e);
                                this.handleChange(e);
                            }}
                            required/>
                        <FormFeedback valid>
                            That's a good looking username you've got there.
                        </FormFeedback>
                        <FormFeedback>
                            Uh oh! Looks like there is an issue with your username. Please input a correct username.
                        </FormFeedback>
                        <FormText>Please enter username with at least 6 characters.</FormText>
                    </FormGroup>
                </Col>
                <Col sm="12" md={{size: 6, offset: 3}}>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="name@email.com"
                            value={email}
                            valid={this.state.validate.emailState === 'has-success'}
                            invalid={this.state.validate.emailState === 'has-danger'}
                            onChange={(e) => {
                                this.validateEmail(e);
                                this.handleChange(e);
                            }}
                            required/>
                        <FormFeedback valid>
                            That's a tasty looking email you've got there.
                        </FormFeedback>
                        <FormFeedback>
                            Uh oh! Looks like there is an issue with your email. Please input a correct email.
                        </FormFeedback>
                        <FormText>Please enter a valid email address.</FormText>
                    </FormGroup>
                </Col>
                <Col sm="12" md={{size: 6, offset: 3}}>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="********"
                            value={password}
                            valid={this.state.validate.passwordState === 'has-success'}
                            invalid={this.state.validate.passwordState === 'has-danger'}
                            onChange={(e) => {
                                this.validatePassword(e);
                                this.validateConfirmPassword(e);
                                this.handleChange(e);
                            }}
                            required/>
                        <FormFeedback valid>
                            That's a great looking password you've got there.
                        </FormFeedback>
                        <FormFeedback>
                            Uh oh! Looks like there is an issue with your password. Please input a correct password.
                        </FormFeedback>
                        <FormText>The password must contains 1 lower and 1 upper case character. The minimum
                            password length is 6 characters.</FormText>
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmPassword">Confirm password</Label>
                        <Input
                            type="password"
                            name="confirmPassword"
                            placeholder="********"
                            value={confirmPassword}
                            valid={this.state.validate.confirmPasswordState === 'has-success'}
                            invalid={this.state.validate.confirmPasswordState === 'has-danger'}
                            onChange={(e) => {
                                this.validateConfirmPassword(e);
                                this.handleChange(e);
                            }}
                            required/>
                        <FormFeedback valid>
                            It looks like your passwords match.
                        </FormFeedback>
                        <FormFeedback>
                            Uh oh! Looks like passwords do not match the requirements.
                        </FormFeedback>
                        <FormText>Repeat the entered password.</FormText>
                    </FormGroup>
                </Col>
                <Button color="secondary" className=" offset-sm-8">Register</Button>
            </Form>

        );
    }

}

export default RegisterForm