import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import {toast, ToastContainer, Zoom} from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import Header from "./Common/Header/Header";
import Home from "./Home/Home";
import RegisterForm from "./Register/RegisterForm";
import LoginForm from "./Login/LoginForm";
import Upload from "./Upload/Upload";
import UserService from "./Services/User-Service";
import UserRoute from "./Common/Routes/UserRoute";
import GuestRoute from "./Common/Routes/GuestRoute";
import Panel from "./AdminPanel/Panel";
import EditUser from "./AdminPanel/EditUser";
import AdminRoute from "./Common/Routes/AdminRoute";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            validate: {
                usernameState: '',
                emailState: '',
                passwordState: '',
                confirmPasswordState: '',
            },
            isOpen: false,
            user: {
                isAdmin: false,
                username: null,
                userId: null
            }
        };
        this.userService = new UserService();

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
    };

    validateUsername(e) {
        const {validate} = this.state;
        if (e.target.value.length >= 6) {
            validate.usernameState = 'has-success'
        } else {
            validate.usernameState = 'has-danger'
        }
        this.setState({validate})
    };

    validatePassword(e) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[0-9]).{6,}$/;
        const {validate} = this.state;
        if (passwordRegex.test(e.target.value)) {
            validate.passwordState = 'has-success'
        } else {
            validate.passwordState = 'has-danger'
        }
        this.setState({validate})
    };

    validateConfirmPassword(e) {
        const {validate} = this.state;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[0-9]).{6,}$/;
        if (passwordRegex.test(e.target.value) && e.target.value === this.state.password) {
            validate.confirmPasswordState = 'has-success'
        } else {
            validate.confirmPasswordState = 'has-danger'
        }

        this.setState({validate})
    };

    handleChange = (event) => {
        const {target} = event;
        const value = target.value;
        const {name} = target;
        this.setState({
            [name]: value,
        });
    };

    componentDidMount() {
        const token = {token: localStorage.getItem('token')};
        if (!this.state.user.username && token.token) {
            this.userService.isAuth(token)
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
    };

    logout = () => {
        localStorage.removeItem('token');
        this.setState({user: {isAdmin: false, username: null, userId: null}});
        toast('You have successfully logged out!')
    };

    loginFormSubmit = (e) => {
        e.preventDefault();
        const {emailState, passwordState} = e.validate;
        const user = {email: e.target.email.value, password: e.target.password.value};
        if (emailState === 'has-success' && passwordState === 'has-success') {
            this.userService.loginUser(user)
                .then((body) => {
                    if (!body.token) {
                        toast.error(body.message)
                    } else {
                        this.setState({
                            email: '',
                            password: '',
                            validate: {
                                emailState: '',
                                passwordState: '',
                            },
                            user: {
                                isAdmin: body.isAdmin,
                                username: body.username,
                                userId: body.userId
                            }
                        });

                        toast.success(body.message);

                        localStorage.setItem('token', body.token);
                    }
                })
        }
    };

    registerFormSubmit = (e) => {
        e.preventDefault();
        const {emailState, passwordState, confirmPasswordState} = e.validate;
        const user = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value
        };
        if (emailState === 'has-success' && passwordState === 'has-success' && confirmPasswordState === 'has-success') {
            this.userService.registerUser(user)
                .then((body) => {
                    if (!body.token) {
                        toast.error(body.message);
                    } else {
                        this.setState({
                            username: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                            validate: {
                                usernameState: '',
                                emailState: '',
                                passwordState: '',
                                confirmPasswordState: ''
                            },
                            user: {
                                username: body.username,
                                userId: body.userId
                            }
                        });
                        toast.success(body.message);
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
                    <Route path="/" exact
                           component={() => <Home user={this.state.user}/>}/>
                    <GuestRoute path="/login" component={LoginForm}
                                isAuth={!!this.state.user.username}
                                loginFormSubmit={this.loginFormSubmit}
                                handleChange={(e) => this.handleChange(e)}
                                validatePassword={(e) => this.validatePassword(e)}
                                validateEmail={(e) => this.validateEmail(e)}
                                email={this.state.email}
                                password={this.state.password}
                                validate={this.state.validate}
                    />
                    <GuestRoute path="/register" component={RegisterForm}
                                isAuth={!!this.state.user.username}
                                registerFormSubmit={this.registerFormSubmit}
                                handleChange={(e) => this.handleChange(e)}
                                validateEmail={(e) => this.validateEmail(e)}
                                validateUsername={(e) => this.validateUsername(e)}
                                validatePassword={(e) => this.validatePassword(e)}
                                validateConfirmPassword={(e) => this.validateConfirmPassword(e)}
                                email={this.state.email}
                                username={this.state.username}
                                password={this.state.password}
                                validate={this.state.validate}
                    />
                    <UserRoute path="/upload" user={this.state.user} isAuth={!!this.state.user.username}
                               component={Upload}/>
                    <AdminRoute path="/:username/edit" exact isAdmin={this.state.user.isAdmin} component={EditUser}/>
                    <AdminRoute path="/admin" exact isAdmin={this.state.user.isAdmin} component={Panel}/>
                    <ToastContainer transition={Zoom} autoClose={2000} position="bottom-right"/>
                </div>
            </BrowserRouter>
        );
    }
}


export default App;
