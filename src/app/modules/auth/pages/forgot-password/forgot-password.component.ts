import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  private readonly authService=inject(AuthService)
  private readonly router = inject(Router)

  step:number = 1

  isLoading:boolean=false

  private readonly fb= inject(FormBuilder)

  verifyEmail!:FormGroup
  verifyCode!:FormGroup
  resetPassword!:FormGroup

  ngOnInit(): void {
    this.initForm()
    
  }
  
  initForm():void{
    this.verifyEmail = this.fb.group({
      email:[null , [Validators.required , Validators.email]]
    })

    this.verifyCode = this.fb.group({
      resetCode:[null , [Validators.required , Validators.pattern(/^\w{4,10}$/)]]
    })

    this.resetPassword = this.fb.group({
      email:[null , [Validators.required , Validators.email]],
      newPassword:[null , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]]

    })

  }

  formStep1():void{
    if(this.verifyEmail.valid){
      this.authService.submitVerifyEmail(this.verifyEmail.value).subscribe({
      next:(res)=>{
        this.step = 2
      }
    })
    }
  }


  formStep2():void{
    if(this.verifyCode.valid){
      this.authService.submitVerifyCode(this.verifyCode.value).subscribe({
      next:(res)=>{
        this.step = 3
      }
    })
    }
  }

  formStep3():void{
    if(this.resetPassword.valid){
      this.authService.submitVerifyPassword(this.resetPassword.value).subscribe({
      next:(res)=>{
        this.authService.saveToken(res.token)
        this.router.navigate(['/home'])
      }
    })
    }
  }


}
