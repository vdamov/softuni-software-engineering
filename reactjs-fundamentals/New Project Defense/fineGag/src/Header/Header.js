import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";
import React from "react";


const Header = (props) => {
    return (
        <Navbar color="faded" light>
            <NavbarBrand href="/" className="mr-lg-auto">reactstrap</NavbarBrand>
            <NavbarToggler onClick={props.toggleNavbar} className="mr-2"/>
            <Collapse isOpen={!props.collapsed} navbar>
                <Nav navbar>
                    <NavItem>
                        <NavLink >Login</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink>Register</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    )
};

export default Header;