import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../modules/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Input() authType: string =''
  private readonly authService= inject(AuthService)

  isMobileOpen:boolean=true

  toggleMobile(){
    this.isMobileOpen=!this.isMobileOpen
  }

  logout(){
    this.authService.logout()
  }

}
