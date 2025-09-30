import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { AuthService } from '../../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient, private authService:AuthService) { }

  creatOrder(cartId: string, shippingAddress:{details:string, phone:string, city:string}):Observable <any>{

    const returnUrl = "?url=http://localhost:4200"

   return this.http.post(environment.apiUrl + 'orders/checkout-session/' + cartId + returnUrl ,{
      shippingAddress
    }, {
      headers: {
        token: this.authService.getToken()!
      }
    })
  }

  
}
