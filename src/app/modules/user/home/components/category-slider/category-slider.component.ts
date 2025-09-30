import { Component, inject } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../../categories/services/categories.service';
import { Daum } from '../../../categories/models/categories';

@Component({
  selector: 'app-category-slider',
  imports: [CarouselModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.css'
})
export class CategorySliderComponent {

  categories:Daum[] = []
  private readonly categoriesService=inject(CategoriesService)


  customOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      navText: ['', ''],
      autoplay:true,
      autoplayTimeout:2500,
      autoplayHoverPause:true,
      responsive: {
        0: {
          items: 6
        }
      },
      nav: false
    }

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

}
