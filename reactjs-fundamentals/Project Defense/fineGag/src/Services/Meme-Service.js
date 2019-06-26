import {get, post} from "../Common/Data/CRUD";

class MemeService {

    constructor() {
        this.base_url = 'http://localhost:9999/feed';
    }

    addMeme(formData) {
        return post(`${this.base_url}/add-meme`, formData, true);
    }

    deleteMeme(memeId) {
        return post(`${this.base_url}/delete-meme`, memeId);
    }

    getMemes(nextPage) {
        return get(`${this.base_url}/memes?nextPage=${nextPage}`)
    }
}

export default MemeService;
