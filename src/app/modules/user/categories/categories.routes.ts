import { Routes } from "@angular/router";

export const CATEGORIES_ROUTES:Routes=[
        {path:'categories',loadComponent:()=>import('./pages/categories/categories.component').then((c) =>c.CategoriesComponent),title:'Categories'},
        {path:'categories/:id',loadComponent:()=>import('./pages/subcategories/subcategories.component').then((c) =>c.SubcategoriesComponent),title:'Categories'},

]