import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Product } from '../../models/products';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../cart/services/cart.service';
import { WishlistService } from '../../../wishlist/services/wishlist.service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product:Product ={} as Product;
  @Input() inWishList: Boolean = false;
  @Output() addToCart:EventEmitter<string> = new EventEmitter<string>()

  private readonly wishlistService = inject(WishlistService)
  

  onAddToCart(){
    this.addToCart.emit(this.product._id)
  }


  BtnClick_WishList(){
    if(this.inWishList)
    {
      this.removeItem()
    }
    else
    {
      this.addProductToWishlist()
    }
  }


  removeItem(){
    this.wishlistService.deleteProductToWishlist(this.product._id).subscribe({
      next:()=>{
        this.inWishList=false
      }
    })
  }

  

  addProductToWishlist(){
    this.wishlistService.addProductToWishlist(this.product._id).subscribe({
      next:(res)=>{
        this.inWishList=true
      }
    })
  }

}
