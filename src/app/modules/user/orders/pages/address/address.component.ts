import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorsMessageComponent } from '../../../../../shared/components/errors-message/errors-message.component';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-address',
  imports: [ErrorsMessageComponent, ReactiveFormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {

  private readonly ordersService=inject(OrdersService)
  private readonly router=inject(Router)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly fb =inject(FormBuilder)

  cartId:string=''

  errorMsg:string =''
  isLoading:boolean=false
  addressForm!:any

  initForm(){
    this.addressForm = this.fb.group({
  datails: ['', [Validators.required]],
  phone: ['', [Validators.required]],
  city: ['', [Validators.required]],
  })
  } 


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((res)=>{
      this.cartId = res.get('id')!
    })
    this.initForm()
  }




  getValues(){

    if(this.addressForm.valid){
      this.isLoading = true
      this.ordersService.creatOrder(this.cartId,this.addressForm.value).subscribe({
        next: (res) => {
          if(res.status == 'success'){
            this.isLoading = false

            open(res.session.url,'_self')
          }
        }
      })
    } else{
      this.addressForm.markAllAsTouched()
    }
    
  }

}
