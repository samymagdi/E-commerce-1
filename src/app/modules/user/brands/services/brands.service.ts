import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private http:HttpClient) { }


  getAllBrands():Observable<any>{
      return this.http.get(environment.apiUrl + 'brands')
    }


    getBrandById(id:string):Observable<any>{
    return this.http.get(environment.apiUrl + 'brands/' + id)
  }
}
