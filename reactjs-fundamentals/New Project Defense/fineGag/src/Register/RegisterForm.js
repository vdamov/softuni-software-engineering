import React from "react";
import {Button, Col, Form, FormFeedback, FormGroup, FormText, Input, Label} from "reactstrap";

const RegisterForm = (props) => {
    return (
        <Form className="form-control-lg" onSubmit={
            (e) => {
                e.validate = props.validate;
                props.registerFormSubmit(e);
            }}>
            <Col sm="12" md={{size: 6, offset: 3}}>
                <FormGroup>
                    <Label>Username</Label>
                    <Input
                        type="text"
                        name="username"
                        placeholder="John_Doe"
                        value={props.username}
                        valid={props.validate.usernameState === 'has-success'}
                        invalid={props.validate.usernameState === 'has-danger'}
                        onChange={(e) => {
                            props.validateUsername(e);
                            props.handleChange(e);
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
                        value={props.email}
                        valid={props.validate.emailState === 'has-success'}
                        invalid={props.validate.emailState === 'has-danger'}
                        onChange={(e) => {
                            props.validateEmail(e);
                            props.handleChange(e);
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
                        value={props.password}
                        valid={props.validate.passwordState === 'has-success'}
                        invalid={props.validate.passwordState === 'has-danger'}
                        onChange={(e) => {
                            props.validatePassword(e);
                            props.validateConfirmPassword(e);
                            props.handleChange(e);
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
                        value={props.confirmPassword}
                        valid={props.validate.confirmPasswordState === 'has-success'}
                        invalid={props.validate.confirmPasswordState === 'has-danger'}
                        onChange={(e) => {
                            props.validateConfirmPassword(e);
                            props.handleChange(e);
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
};

export default RegisterForm