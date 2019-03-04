import React, {Fragment} from 'react';
import {NavLink} from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <header className="site-navbar py-3 border-bottom" role="banner">

                <div className="site-mobile-menu">
                    <div className="site-mobile-menu-header">
                        <div className="site-mobile-menu-close mt-3">
                            <span className="icon-close2 js-menu-toggle"/>
                        </div>
                    </div>
                    <div className="site-mobile-menu-body"/>
                </div>

                <div className="container-fluid">
                    <div className="row align-items-center">

                        <div className="col-6 col-xl-2" data-aos="fade-down">
                            <h1 className="mb-0"><a href="/#" className="text-black h4 mb-0">TrueVisionary</a></h1>
                        </div>
                        <div className="col-10 col-md-8 d-none d-xl-block" data-aos="fade-down">
                            <nav className="site-navigation position-relative text-right text-lg-center"
                                 role="navigation">
                                <Fragment>
                                    <ul className="site-menu js-clone-nav mx-auto d-none d-lg-block">
                                        <li><NavLink to="/" exact activeClassName="selected">Home</NavLink></li>
                                        <li className="has-children">
                                            <a href="#">Gallery</a>
                                            <ul className="dropdown">
                                                <li><a href="/#">Nature</a></li>
                                                <li><a href="/#">Portrait</a></li>
                                                <li><a href="/#">People</a></li>
                                                <li><a href="/#">Architecture</a></li>
                                                <li><a href="/#">Animals</a></li>
                                                <li><a href="/#">Sports</a></li>
                                                <li><a href="/#">Travel</a></li>
                                                <li className="has-children">
                                                    <a href="/#">Sub Menu</a>
                                                    <ul className="dropdown">
                                                        <li><a href="/#">Menu One</a></li>
                                                        <li><a href="/#">Menu Two</a></li>
                                                        <li><a href="/#">Menu Three</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li><NavLink to="/services" exact activeClassName="selected">Services</NavLink>
                                        </li>
                                        <li><NavLink to="/about" exact activeClassName="selected">About</NavLink></li>
                                        <li><NavLink to="/contact" exact activeClassName="selected">Contact</NavLink>
                                        </li>
                                    </ul>
                                </Fragment>
                            </nav>
                        </div>

                        <div className="col-6 col-xl-2 text-right" data-aos="fade-down">
                            <div className="d-none d-xl-inline-block">
                                <ul className="site-menu js-clone-nav ml-auto list-unstyled d-flex text-right mb-0"
                                    data-class="social">
                                    <li>
                                        <a href="https://www.facebook.com/True.Visionary.Images/"
                                           className="pl-0 pr-3"><span className="icon-facebook"/></a>
                                    </li>
                                    <li>
                                        <a href="https://www.instagram.com/_truevisionary/" className="pl-3 pr-3"><span
                                            className="icon-instagram"/></a>
                                    </li>
                                </ul>
                            </div>

                            <div className="d-inline-block d-xl-none ml-md-0 mr-auto py-3">
                                <a href="/#" className="site-menu-toggle js-menu-toggle text-black"><span
                                    className="icon-menu h3"/></a></div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }

}

export default Header;