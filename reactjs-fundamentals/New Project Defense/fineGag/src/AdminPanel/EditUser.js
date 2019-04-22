import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import UserService from "../Services/User-Service";


export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            user: null
        };
        this.userService = new UserService();
        this.username = this.props.match.params.username;
        this.userService.getUserByUsername(this.username).then((data) => {
            console.log(data);
            this.setState({
                username: data.user.username,
                email: data.user.email,
                user: data.user
            })
        });
    }

    handleChange = (event) => {
        const {target} = event;
        const value = target.value;
        const {name} = target;
        this.setState({
            [name]: value,
        });
    };


    handleSubmit = (e) => {
        e.preventDefault();
        this.userService.editUser(
            {
                userId: this.state.user._id,
                email: e.target.email.value,
                username: e.target.username.value
            }
        ).then(() => this.props.history.push('/admin'))
    };

    componentWillMount() {

    }

    render() {

        return (
            <div>
                <Form className="form-control-lg" onSubmit={
                    (e) => {
                        this.handleSubmit(e);
                    }}>
                    <Col sm="12" md={{size: 6, offset: 3}}>
                        <FormGroup>
                            <Label>Username</Label>
                            <Input
                                type="text"
                                name="username"
                                placeholder="John_Doe"
                                value={this.state.username}
                                onChange={(e) => this.handleChange(e)}
                                required/>
                        </FormGroup>
                    </Col>
                    <Col sm="12" md={{size: 6, offset: 3}}>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                placeholder="name@email.com"
                                value={this.state.email}
                                onChange={(e) => this.handleChange(e)}
                                required/>
                        </FormGroup>
                    </Col>

                    <Button color="secondary" className=" offset-sm-8">Edit</Button>
                </Form>
            </div>
        );
    }

}



