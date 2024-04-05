

import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { product } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  addproductMessage: string | undefined;
  isNameFilled: boolean = false;
  constructor(private productService: ProductsService, private router:Router) {
    
  }

  // submit(data: product) {
  //   this.productService.addProduct(data).subscribe((result) => {
  //     console.warn(result);
  //     if (result) {
  //       this.addproductMessage = "Product is successfully added";
  //       setTimeout(() => (
  //         this.router.navigate(['seller-home']),
  //         this.addproductMessage = undefined), 2000);
  //     }
  //   });
  // }
  submit(data: product) {
    const confirmation = confirm("Are you sure you want to add this product?");
  
    if (confirmation) {
      this.productService.addProduct(data).subscribe((result) => {
        console.warn(result);
        if (result) {
          this.addproductMessage = "Product is successfully added";
          setTimeout(() => (
            this.router.navigate(['seller-home']),
            this.addproductMessage = undefined), 2000);
        }
      });
    } else {
      alert("Product addition cancelled.");
    }
  }
  
}
