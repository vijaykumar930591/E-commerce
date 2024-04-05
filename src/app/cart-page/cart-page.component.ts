import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { cart, priceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  };
  constructor(private product: ProductsService,  private router:Router) {


  }
  ngOnInit(): void {
    this.loadDetails();
  }
  // checkout()
  // {
  //   this.router.navigate(['/checkout']);
  //   alert('Are you sure to checkOut ')
  // }
  checkout() {
    if (confirm('Are you sure you want to checkout?')) {
      this.router.navigate(['/checkout']);
      alert('Confirmation: Your order has been processed.');
    } else {
      alert('Checkout canceled.');
    }
  }

  // removeToCart(cartId:string| undefined)
  // {
  //   cartId && this.cartData && this .product.removeToCart(cartId).
  //   subscribe((result)=>
  //   {
  //     confirm("Do You Want To remove the Cart")
  //     this.loadDetails();
      
  //   })
  // }
  removeToCart(cartId: string | undefined) {
    if (cartId && this.cartData) {
        const confirmed = window.confirm("Do you want to remove the cart?");
        if (confirmed) {
            this.product.removeToCart(cartId).subscribe((result) => {
                // Success callback
                this.loadDetails();
            });
        }
    }
}

  loadDetails()
  {
    this.product.currentcart().subscribe((result) => {
      this.cartData = result;
      console.warn(result);
      let price = 0;
      result.forEach((item) => {
        price = price + (+item.price)
      });
      console.warn(price);
      this.priceSummary.price=price;
      this.priceSummary.discount=price/10;
      this.priceSummary.tax=price/10;
      this.priceSummary.delivery=100;
      this.priceSummary.total=price+(price/10)+100-(price/10);
      console.warn(this.priceSummary);
      if(!this.cartData.length)
      {
        this.router.navigate(['/'])
      }
      
    })
  }
}


