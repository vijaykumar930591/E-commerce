import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  productdata: undefined | product;
  productmessage: undefined | string;

  constructor(private route: ActivatedRoute, private product: ProductsService,private router:Router) { }
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id')
    console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((data) => {
      console.warn(data)
      this.productdata = data;
    })
  }           
  // submit(data: product) {
  //   console.warn(data)
  //   if(this.productdata)
  //   {
  //     data.id=this.productdata.id;
  //   }
  //   this.product.updatproduct(data).subscribe((result) => {
  //     if (result) {
  //       this.productmessage = "product has updated";
  //     }

  //   });
  //    setTimeout(() => {
  //     this.router.navigate(['seller-home']),
  //     this.productmessage=undefined;
  //    }, 3000);
  // }
  submit(data: product) {
    const confirmation = confirm("Are you sure you want to update this product?");
  
    if (confirmation) {
      console.warn(data);
      if (this.productdata) {
        data.id = this.productdata.id;
      }
      this.product.updatproduct(data).subscribe((result) => {
        if (result) {
          this.productmessage = "Product has been updated";
        }
      });
      setTimeout(() => {
        this.router.navigate(['seller-home']);
        this.productmessage = undefined;
      }, 3000);
    } else {
      console.log("Product update cancelled.");
    }
  }
  
}
