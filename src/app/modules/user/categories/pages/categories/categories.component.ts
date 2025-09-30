import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Daum } from '../../models/categories';
import { SubcategoriesComponent } from "../subcategories/subcategories.component";

@Component({
  selector: 'app-categories',
  imports: [SubcategoriesComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  categories:Daum[] = []
  selectedCategory:any
  categoryName:string=''

  private readonly categoriesService=inject(CategoriesService)

  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories(){
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categories=res.data
      }
    })
  }

 selectCategory(id:any , name:string){
  this.selectedCategory = id
  this.categoryName=name
 }

}
