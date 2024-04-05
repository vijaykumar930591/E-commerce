import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { product } from '../data-type';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  // polularProduct: any | product[];
  // trendyProducts: any | product[];
  // constructor(private product: ProductsService) { }

  // ngOnInit(): void {
  //   this.product.popularProduct().subscribe(
  //     (data) => {
  //       console.warn(data);
  //       this.polularProduct = data;
  //     });
  //   this.product.trendyProducts().subscribe((data) => {
  //     this.trendyProducts = data;
  //   })
  // }
  // signUp(data: object): void {
  //   console.warn(data);
  // }
  popularProducts:undefined | product[]
  trendyProducts:undefined|product[]
constructor(private product:ProductsService){0}
ngOnInit():void{
 
  this.product.popularProduct().subscribe((data)=>{
    console.warn(data);
    this.popularProducts=data;
   
  });
  this.product.trendyProducts().subscribe((data)=>{
    console.warn(data);
    this.trendyProducts=data;
  });
  
 
}

  
}
