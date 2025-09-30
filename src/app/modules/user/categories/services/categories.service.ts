import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient) { }


  getAllCategories():Observable<any>{
      return this.http.get(environment.apiUrl + 'categories')
    }


    getCategoriesById(id:string):Observable<any>{
    return this.http.get(environment.apiUrl + 'categories/' + id)
  }
}
