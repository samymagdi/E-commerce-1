import { Component, inject } from '@angular/core';
import { ErrorsMessageComponent } from "../../../../shared/components/errors-message/errors-message.component";
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ErrorsMessageComponent, ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  private readonly authService=inject(AuthService)
  private readonly router=inject(Router)

  errorMsg:string =''
  isLoading:boolean=false

  authForm = new FormGroup({
    
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
  })



  isShowPassword:boolean = true;
  showPassword(){
    this.isShowPassword=!this.isShowPassword
  }


  getValues(){

    if(this.authForm.valid){
      this.isLoading = true
      this.authService.login(this.authForm.value).subscribe({
        next: (res) => {
          if(res.message == 'success'){
            this.authService.saveToken(res.token)

            this.router.navigate(['/home'])
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
