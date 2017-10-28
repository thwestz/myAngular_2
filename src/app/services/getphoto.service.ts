import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GetphotoService {

    constructor(private http: Http) { }

    getPhotoList() {
        return this.http.get("https://jsonplaceholder.typicode.com/photos")
            .map((res) => res.json());
    }

}