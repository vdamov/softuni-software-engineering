import React, {Component} from "react";
import {Button, Col, Container, Form, FormFeedback, FormGroup, FormText, Input, Label} from "reactstrap";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'email': '',
            'password': '',
            validate: {
                emailState: '',
                passwordState: '',
            },
        };
        this.handleChange = this.handleChange.bind(this);
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

    handleChange = (event) => {
        const {target} = event;
        const value = target.value;
        const {name} = target;
        this.setState({
            [name]: value,
        });
    };

    submitForm(e) {
        e.preventDefault();
        console.log(`Email: ${this.state.email} Password: ${this.state.password}`)
    }

    render() {
        const {email, password} = this.state;
        return (
            <Container>
                <h2>Login</h2>
                <Form className="wrapper" onSubmit={(e) => this.submitForm(e)}>
                    <Col>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="exampleEmail"
                                placeholder="example@email.com"
                                value={email}
                                valid={this.state.validate.emailState === 'has-success'}
                                invalid={this.state.validate.emailState === 'has-danger'}
                                onChange={(e) => {
                                    this.validateEmail(e);
                                    this.handleChange(e)
                                }}
                            />
                            <FormFeedback valid>
                                That's a tasty looking email you've got there.
                            </FormFeedback>
                            <FormFeedback>
                                Uh oh! Looks like there is an issue with your email. Please input a correct email.
                            </FormFeedback>
                            <FormText>Please enter a valid email address.</FormText>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="examplePassword"
                                placeholder="********"
                                value={password}
                                valid={this.state.validate.passwordState === 'has-success'}
                                invalid={this.state.validate.passwordState === 'has-danger'}
                                onChange={(e) => {
                                    this.validatePassword(e);
                                    this.handleChange(e);
                                }}
                            />
                            <FormFeedback valid>
                                That's a great looking password you've got there.
                            </FormFeedback>
                            <FormFeedback>
                                Uh oh! Looks like there is an issue with your password. Please input a correct password.
                            </FormFeedback>
                            <FormText>The password must contains 1 lower and 1 upper case character. The minimum
                                password length is 6 characters.</FormText>
                        </FormGroup>
                    </Col>
                    <Button className="float-lg-right">Submit</Button>
                </Form>
            </Container>
        );
    }
}

export default LoginForm