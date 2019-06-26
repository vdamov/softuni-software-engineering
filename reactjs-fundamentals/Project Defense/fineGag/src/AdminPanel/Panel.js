import React, {Component} from 'react';
import Table from "reactstrap/es/Table";
import UserService from "../Services/User-Service";
import Button from "reactstrap/es/Button";
import {Link} from "react-router-dom";

export default class Panel extends Component {
    constructor(props) {
        super(props);
        this.userService = new UserService();
        this.state = {
            users: [],
            editPage: false
        };
    }

    componentDidMount() {
        this.getAllUsers();
    }

    deleteUser(userId) {
        this.userService.deleteUser(userId)
            .then(() => {
                this.setState({
                    users: this.state.users.filter((u) => u._id !== userId)
                })
            })
            .catch((e) => console.log(e));
    }

    getAllUsers() {
        this.userService.getAllUsers().then((users) => {
            this.setState({
                users: this.state.users.concat(users)
            })
        })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (

            <div className="pb-5">
                <Table striped>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Memes</th>
                        <th>Comments</th>
                        <th>Likes</th>
                        <th>Dislikes</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.users.map((user, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.memes}</td>
                            <td>{user.comments}</td>
                            <td>{user.likes}</td>
                            <td>{user.dislikes}</td>
                            <td>
                                <Link to={{
                                    pathname: `/${user.username}/edit`
                                }}><Button color="primary" size="sm"
                                           className="mr-2">Edit</Button></Link>
                                <Button color="danger" onClick={(e) => {
                                    e.preventDefault();
                                    this.deleteUser(user._id);
                                }} size="sm" className="mr-2">Delete</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        );
    }

}
