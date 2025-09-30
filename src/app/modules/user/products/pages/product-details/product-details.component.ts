import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/products';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../cart/services/cart.service';
import { WishlistService } from '../../../wishlist/services/wishlist.service';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  id:any;
  product : Product ={} as Product
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productService = inject(ProductsService)
  private readonly cartService = inject(CartService)
  private readonly toastr = inject(ToastrService)
  private readonly wishlistService= inject(WishlistService)
  inWishList: Boolean = true;

  ngOnInit(): void {
    this.getId()
    this.getProductById()
    
  }

  constructor(private route: ActivatedRoute) {}

  getId(){
    this.activatedRoute.paramMap.subscribe({
      next:(value)=>{
        this.id = value.get('id')
      }
    })
    this.route.queryParams.subscribe(params => {
      this.inWishList = params['inWishList'] == 'true';
    });
  }

  getProductById(){
    this.productService.getProductById(this.id).subscribe({
      next:(res)=>{
        this.product = res.data
      }
    })
  }  


  onAddToCart(id:string){
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
        this.inWishList=false      }
    })
  }

  addProductToWishlist(){
    this.wishlistService.addProductToWishlist(this.id).subscribe({
      next:(res)=>{
        this.inWishList=true
      }
    })
  }



}
