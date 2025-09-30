import { Routes } from "@angular/router";
import { UserLayoutComponent } from "../../layouts/user-layout/user-layout.component";
import { PRODUCTS_ROUTES } from "./products/products.routes";
import { CART_ROUTES } from "./cart/cart.routes";
import { BRANDS_ROUTES } from "./brands/brands.routes";
import { WISHLIST_ROUTES } from "./wishlist/wishlist.routes";
import { HOME_ROUTES } from "./home/home.routes";
import { ORDERS_ROUTES } from "./orders/orders.routes";
import { CATEGORIES_ROUTES } from "./categories/categories.routes";

export const USER_ROUTES :Routes=[
{path:'',component:UserLayoutComponent,
    children:[
        ...HOME_ROUTES,
        ...PRODUCTS_ROUTES,
        ...CART_ROUTES,
        ...WISHLIST_ROUTES,
        ...BRANDS_ROUTES,
        ...ORDERS_ROUTES,
        ...CATEGORIES_ROUTES,
        
    ]
}
]