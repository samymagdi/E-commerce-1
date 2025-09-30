import { Component, inject } from '@angular/core';
import { BrandsService } from '../../services/brands.service';
import { Brand } from '../../../products/models/products';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {


  brands:Brand[] = []
  private readonly brandsService=inject(BrandsService)

  ngOnInit(): void {
    this.getAllBrands()
  }

  getAllBrands(){
    this.brandsService.getAllBrands().subscribe({
      next:(res)=>{
        this.brands=res.data
      }
    })
  }
}
