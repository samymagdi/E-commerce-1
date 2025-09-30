import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router:Router) { }

  register(data: any):Observable<any> {
    return this.http.post(environment.apiUrl + 'auth/signup' , data)
  }

  login(data: any):Observable<any> {
    return this.http.post(environment.apiUrl + 'auth/signin' , data)
  }

  saveToken(token:string){
    localStorage.setItem('token',token)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn():boolean{
    const token = localStorage.getItem('token')

    return !!token
  }

  logout(){
    this.router.navigate(['/login'])
    localStorage.clear()
  }

  submitVerifyEmail(data:object):Observable<any>{
    return this.http.post(environment.apiUrl + `auth/forgotPasswords` , data)
  }

  submitVerifyCode(data:object):Observable<any>{
    return this.http.post(environment.apiUrl + `auth/verifyResetCode` , data)
  }

  submitVerifyPassword(data:object):Observable<any>{
    return this.http.put(environment.apiUrl + `auth/resetPassword` , data)
  }
}
