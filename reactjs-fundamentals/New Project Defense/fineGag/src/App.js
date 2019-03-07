import React, {Component, Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Header/Header";
import RegisterForm from "./Register/RegisterForm";

class App extends Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <Fragment>
                <Header toggleNavbar={this.toggleNavbar} collapsed={this.state.collapsed} />
                <div className="container ">
                    <RegisterForm/>
                </div>
            </Fragment>
        );
    }
}

export default App;
