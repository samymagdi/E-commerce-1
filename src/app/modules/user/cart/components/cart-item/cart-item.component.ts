import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/cart';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {

  @Input() product: Product={} as Product
  @Output() removeItem = new EventEmitter<string>()
  @Output() updateQty = new EventEmitter<{id:string, count:number}>()

  onRemoveItem(){
    this.removeItem.emit(this.product.product._id)
  }

  onChangeQty(count: number){
    this.updateQty.emit({id:this.product.product._id,count})

  }

}
