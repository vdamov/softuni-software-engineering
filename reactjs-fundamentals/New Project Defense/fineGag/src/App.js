import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./Header/Header";
import Home from "./Home/Home";
import RegisterForm from "./Register/RegisterForm";
import LoginForm from "./Login/LoginForm";
import Upload from "./Upload/Upload";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            user: {
                isAdmin: false,
                username: null,
                userId: null
            }
        };

    }


    componentDidMount() {
        if (!this.state.user.username && localStorage.getItem('token')) {
            fetch('http://localhost:9999/auth/is-auth', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    token: localStorage.getItem('token')
                })

            }).then(response => response.json())
                .then(data => {
                    this.setState({
                        user: {
                            username: data.username,
                            userId: data.userId,
                            isAdmin: data.isAdmin
                        }
                    })
                })
        }
    }

    logout = () => {
        localStorage.removeItem('token');
        this.setState({user: {isAdmin: false, username: null, userId: null}})
    };

    loginFormSubmit = (e) => {
        e.preventDefault();
        const {emailState, passwordState} = e.validate;
        const {email, password} = e.target;
        const loginUrl = 'http://localhost:9999/auth/signin';
        if (emailState === 'has-success' && passwordState === 'has-success') {

            fetch(loginUrl, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: email.value,
                    password: password.value
                })
            })
                .then(response => response.json())
                .then((body) => {
                    if (!body.token) {
                        console.log(body.message);
                    } else {
                        if (body.isAdmin) {
                            this.setState({
                                user: {
                                    isAdmin: true,
                                    username: body.username,
                                    userId: body.userId
                                }
                            })
                        } else {
                            this.setState({
                                user: {
                                    username: body.username,
                                    userId: body.userId,
                                    isAdmin: false
                                }
                            });

                        }
                        localStorage.setItem('token', body.token);
                    }
                })
        }
    };

    registerFormSubmit = (e) => {
        e.preventDefault();
        const {emailState, passwordState, confirmPasswordState} = e.validate;
        const {username, email, password} = e.target;
        const registerUrl = 'http://localhost:9999/auth/signup';
        if (emailState === 'has-success' && passwordState === 'has-success' && confirmPasswordState === 'has-success') {

            fetch(registerUrl, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: email.value,
                    username: username.value,
                    password: password.value
                })
            })
                .then(response => response.json())
                .then((body) => {
                    if (!body.token) {
                        console.log(body.message);
                    } else {
                        this.setState({
                            user: {
                                username: body.username,
                                userId: body.userId
                            }
                        });
                        localStorage.setItem('token', body.token);

                    }
                })
        }
    };


    render() {
        return (
            <BrowserRouter>
                <div className="container pt-5">
                    <Header user={this.state.user}
                            logout={this.logout}
                            toggle={this.toggle}
                            isOpen={this.state.isOpen}/>
                    <Route path="/register" exact
                           render={() => (
                               this.state.user.username ?
                                   (<Redirect to="/"/>) :
                                   (<RegisterForm registerFormSubmit={this.registerFormSubmit}/>)
                           )}/>
                    <Route path="/upload" exact render={() => (
                        this.state.user.username ?
                            (<Upload user={this.state.user}/>) :
                            (<Redirect to="/"/>)
                    )}/>
                    <Route path="/login" exact
                           render={() => (
                               this.state.user.username ?
                                   (<Redirect to="/"/>) :
                                   (<LoginForm loginFormSubmit={this.loginFormSubmit}/>)
                           )}/>
                    <Route path="/" exact
                           component={() => <Home user={this.state.user}/>}/>
                </div>
            </BrowserRouter>
        );
    }
}


export default App;
