import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { cart, orders } from '../data-type';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartData: cart[] | undefined
  color: { [klass: string]: any; } | null | undefined;
  constructor(private product: ProductsService, private router: Router,private fb :FormBuilder) { }
  totalprice: number | undefined;
  ordermsg: string | undefined;
  

  ngOnInit(): void {
    this.product.currentcart().subscribe((result) => {

      let price = 0;
      this.cartData = result
      result.forEach((item) => {
        price = price + (+item.price)
      });
      this.totalprice = price + (price / 10) + 100 - (price / 10);
      console.warn(this.totalprice);



    })
  }

  // orderNow(data: { email: string, address: string, contact: string }) {
  //   console.warn(data);
  //   let user = localStorage.getItem("user");
  //   let userId = user && JSON.parse(user).id;
  //   if (this.totalprice) {
  //     let orderData: orders = {
  //       ...data,
  //       totalprice: this.totalprice,
  //       userId,
  //       id: undefined
  //     }
  //     this.cartData?.forEach((item) => {
  //       setTimeout(() => {
  //         item.id && this.product.deleteCartItems(item.id)
  //       }, 700)
  //     })


  //     this.product.orderNow(orderData).subscribe((result) => {
  //       if (result) {
          
  //         this.ordermsg = "Your Order has been placed"
  //           confirm("are you  sure to continue?") ;

  //         setTimeout(() => {
  //           this.router.navigate(['/my-orders']);
  //           this.ordermsg = undefined
  //         }, 4000)
  //       }
  //     })
  //   }
  // }
  orderNow(data: { email: string, address: string, contact: string }) {
    console.warn(data);
    let user = localStorage.getItem("user");
    let userId = user && JSON.parse(user).id;
    
    if (this.totalprice) {
      let orderData: orders = {
        ...data,
        totalprice: this.totalprice,
        userId,
        id: undefined
      };
  
      const confirmation = confirm("Are you sure you want to place the order?");
  
      if (confirmation) {
        this.cartData?.forEach((item) => {
          setTimeout(() => {
            item.id && this.product.deleteCartItems(item.id);
          }, 700);
        });
  
        this.product.orderNow(orderData).subscribe((result) => {
          if (result) {
            this.ordermsg = "Your Order has been placed";
  
            setTimeout(() => {
              this.router.navigate(['/my-orders']);
              this.ordermsg = undefined;
            }, 4000);
          }
        });
      } else {
        // Handle cancellation
        console.log("Order placement cancelled.");
      }
    }
  }
   
}