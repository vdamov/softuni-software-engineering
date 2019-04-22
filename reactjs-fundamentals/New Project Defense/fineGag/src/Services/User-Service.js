import {get, post, put} from "../Common/Data/CRUD";


class UserService {

    constructor() {
        this.base_url = 'http://localhost:9999/auth';
    }

    registerUser(user) {
        return post(`${this.base_url}/signup`, user);
    }

    loginUser(user) {
        return post(`${this.base_url}/signin`, user);
    }

    isAuth(token) {
        return post(`${this.base_url}/is-auth`, token)
    }

    getAllUsers() {
        return get(`${this.base_url}/users`)
    }

    editUser(body) {
        return put(`${this.base_url}/edit/user`, body);
    }

    deleteUser(userId) {
        return post(`${this.base_url}/delete/user`, {userId});
    }

    getUserByUsername(username) {
        return get(`${this.base_url}/user/${username}`)
    }
}

export default UserService;
