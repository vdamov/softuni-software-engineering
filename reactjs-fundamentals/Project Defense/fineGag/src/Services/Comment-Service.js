import {post} from "../Common/Data/CRUD";

class CommentService {

    constructor() {
        this.base_url = 'http://localhost:9999/feed';
    }

    addComment(data) {
        return post(`${this.base_url}/add-comment`, data);
    }

    deleteComment(data) {
        return post(`${this.base_url}/delete-comment`, data);
    }
}

export default CommentService;
