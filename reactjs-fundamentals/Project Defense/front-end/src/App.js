import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";

import Contact from "./contact/Contact";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import About from "./about/About";
import Services from "./services/Services";
import Home from "./home/Home";



class App extends Component {
    constructor(props) {
        super(props);
    }


    render() {

        return (
            <BrowserRouter forceRefresh={true}>
                <div>
                    <Header/>
                    <Route path='/' exact component={Home}/>
                    <Route path='/contact' exact component={Contact}/>
                    <Route path='/about' exact component={About}/>
                    <Route path='/services' exact component={Services}/>
                    <Footer/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
