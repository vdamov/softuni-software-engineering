import React from "react";
import {Button, Col, Form, FormFeedback, FormGroup, FormText, Input, Label} from "reactstrap";

const LoginForm = (props) => {
    return (
        <Form className="form-control-lg" onSubmit={(e) => {
            e.validate = props.validate;
            props.loginFormSubmit(e);
        }}>
            <Col sm="12" md={{size: 6, offset: 3}}>
                <FormGroup>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        name="email"
                        id="exampleEmail"
                        placeholder="name@email.com"
                        value={props.email}
                        valid={props.validate.emailState === 'has-success'}
                        invalid={props.validate.emailState === 'has-danger'}
                        onChange={(e) => {
                            props.validateEmail(e);
                            props.handleChange(e)
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
                    <Label for="examplePassword">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        id="examplePassword"
                        placeholder="********"
                        value={props.password}
                        valid={props.validate.passwordState === 'has-success'}
                        invalid={props.validate.passwordState === 'has-danger'}
                        onChange={(e) => {
                            props.validatePassword(e);
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
            </Col>
            <Button color="secondary" className=" offset-sm-8">Login</Button>
        </Form>
    );
};

export default LoginForm