import {Collapse, Nav, Navbar, NavbarToggler, NavItem} from "reactstrap";
import React, {Component, Fragment} from "react";
import {Link, NavLink} from "react-router-dom";


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        return (
            <Navbar color="light" light expand="md" fixed="top">
                <Link to="/" className="navbar-brand">fineGAG</Link>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {
                            this.props.user.username ?
                                <Fragment>
                                    <NavItem>
                                        <NavLink to="/upload" className="nav-link">Upload</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink to="/" onClick={this.props.logout}
                                                 className="nav-link">Logout</NavLink>
                                    </NavItem>
                                </Fragment>
                                :
                                <Fragment>
                                    <NavItem>
                                        <NavLink to="/login" className="nav-link">Login</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink to="/register" className="nav-link">Register</NavLink>
                                    </NavItem>
                                </Fragment>
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default Header;