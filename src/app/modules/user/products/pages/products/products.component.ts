import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/products';
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { CartService } from '../../../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../wishlist/services/wishlist.service';

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  products: Product[] = []
  private readonly productServices = inject(ProductsService)
  private readonly cartService = inject(CartService)
  private readonly toastr = inject(ToastrService)
  private readonly wishlistService = inject(WishlistService)
  wishlistDetails:Product[] = []
  ProductIdsList: string[] = []

  ngOnInit(): void {
    this.getAllProducts()
    this.getAllProductsWishlist()
    
  }

  getAllProducts(){
    this.productServices.getAllProducts().subscribe({
      next:(res)=>{
        this.products=res.data
      }
    })
  }

  getAllProductsWishlist(){
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        this.wishlistDetails=res.data;
        this.ProductIdsList = this.wishlistDetails.map(x => x._id);
      }
    })
  }

  addToCart(id:string){
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        if(res.status == 'success'){
          this.toastr.success(res.message,'' , {
            progressBar: true,
            timeOut:1500,
          })
        }
      }
    })
  }

  

}
