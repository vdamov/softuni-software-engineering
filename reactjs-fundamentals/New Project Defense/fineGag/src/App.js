import React, {Component, Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Header/Header";
import Home from "./Home/Home";


class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <Header/>
                <div className="container ">
                    <Home/>
                </div>
            </Fragment>
        );
    }
}


export default App;
