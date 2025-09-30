import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { SubcategoriesService } from '../../services/subcategories.service';
import { Daum } from '../../models/subcategories';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subcategories',
  imports: [],
  templateUrl: './subcategories.component.html',
  styleUrl: './subcategories.component.css'
})
export class SubcategoriesComponent {

  @Input() category:any | null
    @Input() categoryName:any | null

    loadingSub:boolean=false


  subcategories:Daum[] = []
  private readonly subcategoriesService=inject(SubcategoriesService)


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['category'] && this.category){
      this.getSubcategoriesById(this.category)
      this.loadingSub=true
    }
    
  }

  getAllSubcategories(){
    this.subcategoriesService.getAllSubcategories().subscribe({
      next:(res: any)=>{
        this.subcategories = res.data
      }
    })
  }


  getSubcategoriesById(categoryId: any){
    this.subcategoriesService.getSubcategoriesById(categoryId).subscribe({
      next:(res:any)=>{
        this.subcategories = res.data
      }
    })
  }

}


