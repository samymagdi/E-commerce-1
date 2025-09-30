import { Component, inject } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { Wishlist } from '../../models/wishlist';
import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";
import { ProductsService } from '../../../products/services/products.service';
import { Product } from '../../../products/models/products';

@Component({
  selector: 'app-wishlist',
  imports: [ProductCardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {

  private readonly productsService = inject(ProductsService);


  wishlistDetails:Product[] = []
  private readonly wishlistService= inject(WishlistService)

  ngOnInit(): void {
    this.loadWishlistItems()
  }


  loadWishlistItems(){
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        this.wishlistDetails=res.data
      }
    })
  }

  removeItem(productId:string){
    this.wishlistService.deleteProductToWishlist(productId).subscribe({
      next:()=>{
        this.loadWishlistItems()
      }
    })
  }

}
