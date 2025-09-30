import { Component, inject } from '@angular/core';
import{ AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { ErrorsMessageComponent } from "../../../../shared/components/errors-message/errors-message.component";
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, ErrorsMessageComponent,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private readonly authService=inject(AuthService)
  private readonly router=inject(Router)

  errorMsg:string =''
  isLoading:boolean=false

  authForm = new FormGroup({
    
  name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
  rePassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),

  },{validators: this.checkPasswordValidator})

  checkPasswordValidator(control: AbstractControl){
    if(control.get('password')?.value == control.get('rePassword')?.value){
      return null
    } else{
      return{
        mismatch: true
      }
    }
  }



  isShowPasswordF:boolean = true;
  showPasswordF(){
    this.isShowPasswordF=!this.isShowPasswordF
  }

  isShowPasswordS:boolean = true;
  showPasswordS(){
    this.isShowPasswordS=!this.isShowPasswordS
  }




  getValues(){

    if(this.authForm.valid){
      this.isLoading = true
      this.authService.register(this.authForm.value).subscribe({
        next: (res) => {
          if(res.message == 'success'){
            this.router.navigate(['/login'])
            this.isLoading = false
          }
        },
        error: (error) =>{
          this.errorMsg =error.error.message
          this.isLoading = false
        }
      })
    } else{
      this.authForm.markAllAsTouched()
    }
    
  }

}
