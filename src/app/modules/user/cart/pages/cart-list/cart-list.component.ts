import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';
import { CartItemComponent } from "../../components/cart-item/cart-item.component";
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart-list',
  imports: [CartItemComponent, RouterLink],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css'
})
export class CartListComponent {

  isLoaded:boolean=false


  cartDetails: Cart = {} as Cart
  private readonly cartService= inject(CartService)
  private readonly toastr = inject(ToastrService)

  ngOnInit(): void {
    this.loadCartItems()
  }

  loadCartItems(){
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        this.cartDetails=res
        this.isLoaded=true
      }
    })
  }


  removeItem(productId:string){
    this.cartService.removeItem(productId).subscribe({
      next:(res)=>{
        this.toastr.warning('Product deleted!','' , {
            progressBar: true,
            timeOut:1500,
          })
        this.cartDetails=res
      }
    })
  }


  updateQuantity(productId:string,count:number){
    this.cartService.updateQuantity(productId,count).subscribe({
      next:(res)=>{
        this.toastr.success('Product Updated!','' , {
            progressBar: true,
            timeOut:1500,
          })
        this.cartDetails=res
      }
    })
  }


  clearCart(){
    this.cartService.clearCart().subscribe({
      next:(res)=>{
        if(res.message== 'success'){
          this.toastr.warning('All products deleted!','' , {
            progressBar: true,
            timeOut:1500,
          })
          this.loadCartItems()
        }        
      }
    })
  }

}
