import { Component, OnInit } from '@angular/core';
import { SignUp, cart, product } from '../data-type';
import { UserService } from '../service/user.service';

import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = false;
  authError: string = '';
  seller: any;
  localStorage: any;
  constructor(private user: UserService, private product: ProductsService) { }
  ngOnInit(): void {
    this.user.userauthReload();
  }

  signUp(data: SignUp): void {
    // console.warn(data);
    this.user.userSignUp(data);
  }
  login(data: SignUp): void {

    // console.warn(data);
    this.user.userLogin(data);
    this.user.InvalidUserAuth.subscribe((result) => {
      // console.warn(result);
      if (result) {
        this.authError = "please Enter valid Details";
      }
      else {
        this.localCartToRemoteCart()
      }

    })
      ;
  }

  openLogin() {
    this.showLogin = true;
  }


  openSignup() {
    this.showLogin = false;
  }



  //  localCartToRemoteCart() {
  //   let data = this.localStorage.getItem('localCart');
  //   let user = this.localStorage.getItem("user");
  //   let userId = user && JSON.parse(user).id;

  //   if (data) {
  //     let cartDetailList: product[] = JSON.parse(data);

  //     cartDetailList.forEach((product: product, index) => {
  //       let cartData: cart = {
  //         ...product,
  //         productId: product.id,
  //         userId
  //       };

  //       setTimeout(() => {
  //         this.product.addToCart(cartData).subscribe((result) => {
  //           if (result) {
  //             console.warn("Item stored in database");

  //             this.removeItemFromLocalCart(product.id);
  //           }
  //         });
  //       }, 500 * index); 

  //       if (cartDetailList.length === index + 1) {
  //         this.localStorage.removeItem('localCart');
  //       }
  //     });
  //   }


  //   setTimeout(() => {
  //         this.product.getCartList(userId)
  //       }, 2000);
  // }


  // removeItemFromLocalCart(productId: string) {
  //   let data = this.localStorage.getItem('localCart');
  //   if (data) {
  //     let cartDetailList: product[] = JSON.parse(data);
  //     const updatedCartDetailList = cartDetailList.filter(product => product.id !== productId);
  //     this.localStorage.setItem('localCart', JSON.stringify(updatedCartDetailList));
  //   }
  // }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data);

      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId
        }

        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.warn("data is stored in DB");
            }
          })
        }, 500);
        if (cartDataList.length === index + 1) {
          localStorage.removeItem('localCart')
        }
      })
    }

    setTimeout(() => {
      this.product.getCartList(userId)
    }, 200);

  }
}


