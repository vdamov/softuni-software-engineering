import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICategory} from '../../components/shared/interfaces/category.interface';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private readonly getAllURL = '/api/category/all';

    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get<ICategory[]>(this.getAllURL);
    }

}
