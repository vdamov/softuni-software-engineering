import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICategory} from '../../components/shared/interfaces/category.interface';
import {IVideo} from '../../components/shared/interfaces/video.interface';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private readonly getAllURL = '/api/category/all/';
    private readonly get20URL = '/api/category/get20/';

    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get<ICategory[]>(this.getAllURL);
    }

    get20(page: number, name: string) {
        return this.http.get<IVideo[]>(this.get20URL + page + '/' + name);
    }

}
