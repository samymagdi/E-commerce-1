import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { AuthService } from '../../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http: HttpClient, private authService:AuthService) { }




  addProductToWishlist(productId: string):Observable <any>{
    return this.http.post(environment.apiUrl + 'wishlist',{
        productId
      }, {
        headers: {
          token: this.authService.getToken()!
        }
      })
  }

  deleteProductToWishlist(productId:string):Observable <any>{
    return  this.http.delete(environment.apiUrl + `wishlist/${productId}`,{
        headers: {
          token: this.authService.getToken()!
        }
      })
  }

  getLoggedUserWishlist():Observable <any>{
    return  this.http.get(environment.apiUrl + 'wishlist',{
        headers: {
          token: this.authService.getToken()!
        }
      })
  }

}
