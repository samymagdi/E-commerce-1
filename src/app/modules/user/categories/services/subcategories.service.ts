import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {

  constructor(private http:HttpClient) { }


  getAllSubcategories():Observable<any>{
      return this.http.get(environment.apiUrl + 'subcategories')
    }


  getSubcategoriesById(id:string):Observable<any>{
        return this.http.get(environment.apiUrl + 'categories/' + id + '/subcategories')

  }

  getAllSubcategoriesOnCategory(id:string):Observable<any>{
    return this.http.get(environment.apiUrl + 'categories/' + id + '/subcategories')
  }
}
