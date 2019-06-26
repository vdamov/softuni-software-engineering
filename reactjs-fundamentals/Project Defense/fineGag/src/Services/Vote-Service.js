import {post} from "../Common/Data/CRUD";

class VoteService {

    constructor() {
        this.base_url = 'http://localhost:9999/feed';
    }

    addVote(data) {
        return post(`${this.base_url}/add-vote`, data);
    }

}

export default VoteService;
