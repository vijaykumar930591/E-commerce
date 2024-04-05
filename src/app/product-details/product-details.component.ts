
// product-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData: product | undefined; 
  productQuantity: number = 1;
  inCart = false;
  cartData: product | undefined;

  constructor(private activeRoute: ActivatedRoute, private productService: ProductsService) { }

  ngOnInit(): void {
  
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    console.warn(productId);
    productId && this.productService.getProduct(productId).subscribe((result) => {
      this.productData = result;
      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: product) => productId === item.id.toString());
        if (items.length) {
          this.inCart = true
        } else {
          this.inCart = false
        }
      }

      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user).id;
        this.productService.getCartList(userId);

        this.productService.cartData.subscribe((result) => {
          let item = result.filter((item: product) => productId?.toString() === item.productId?.toString())
          if (item.length) {
            this.cartData = item[0];
            this.inCart = true;
          }
        })
      }
    })

  }


  handleQuantity(val: string) {
    if (val === 'plus') {
      if (this.productQuantity < 20) {
        this.productQuantity += 1;
        this.productData && (this.productData.price *= this.productQuantity);
      }
    } else if (val === 'min') {
      if (this.productQuantity > 1) {
        this.productQuantity -= 1;
        this.productData && (this.productData.price /= this.productQuantity + 1);
      }
    }
  }

  

  // addToCart() {
  //   if (this.productData) {
  //     this.productData.quantity = this.productQuantity;
  //     if (!localStorage.getItem('user')) {
  //       this.productService.localAddToCart(this.productData);
  //       this.inCart = true;
        

  //     } else {
  //       let user = localStorage.getItem('user');
  //       let userId = user && JSON.parse(user).id;
  //       let cartData: cart = {
  //         ...this.productData,
  //         productId: this.productData.id,
  //         userId
  //       }
  //       // delete cartData.id;
  //       this.productService.addToCart(cartData).subscribe((result) => {
  //         if (result) {
  //           this.productService.getCartList(userId);
  //           this.inCart = true
  //         }
  //       })
  //     }

  //   }
  // }
  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.productService.localAddToCart(this.productData);
        this.inCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: cart = {
          ...this.productData,
          productId: this.productData.id,
          userId
        };
        const confirmation = confirm("Are you sure you want to add this product to your cart?");
  
        if (confirmation) {
          this.productService.addToCart(cartData).subscribe((result) => {
            if (result) {
              this.productService.getCartList(userId);
              this.inCart = true;
            }
          });
        }
         else {
          console.log("Product addition cancelled.");
        }
      }
    }
  }
  
  // removeFromCart(productId: string) {
  //   if (!localStorage.getItem('user')) {
  //     this.productService.removeItemFromCart(productId);
  //   }
  //   else {
  //     let user = localStorage.getItem("user");
  //     let userId = user && JSON.parse(user).id
  //     console.warn(this.cartData);
  //     this.cartData && this.productService.removeToCart(this.cartData.id).subscribe
  //       ((result) => {
  //         if (result) {
  //           this.productService.getCartList(userId)
  //         }
  //       })
  //   }
  //   this.inCart = false;
  // }

  removeFromCart(productId: string) {
    if (this.productData) {
      if (!localStorage.getItem('user')) {
        this.productService.removeItemFromCart(this.productData.id);
        this.inCart = false;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        const confirmation = confirm("Are you sure you want to remove this product from your cart?");
  
        if (confirmation) {
          this.productService.removeToCart(this.productData.id).subscribe((result) => {
            if (result) {
              this.productService.getCartList(userId);
              this.inCart = false;
            }
          });
        } else {
          console.log("Product removal cancelled.");
        }
      }
    }
  }
  private updateCartStatus(productId: string) {
    const cartData = localStorage.getItem('localCart');
    if (cartData) {
      const items: product[] = JSON.parse(cartData);
      this.inCart = items.some(item => item.id === productId);
    }
  }

}

        
