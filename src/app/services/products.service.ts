import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Query } from '@angular/core';
import { cart, orders, product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  updateCartValue() {
    throw new Error('Method not implemented.');
  }
  cartData = new EventEmitter<product[] | []>();
  constructor(private http: HttpClient) { }
  addProduct(data: product) {
    return this.http.post('http://localhost:3000/products', data);

  }
  productList() {
    return this.http.get<product[]>('http://localhost:3000/products');
  }
  deleteProduct(id: any) {
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }

  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`)
  }
  updatproduct(product: product) {
    console.warn(product)
    return this.http.put<product>(`http://localhost:3000/products/${product.id}`, product);
  }
  popularProduct() {
    return this.http.get<product[]>(`http://localhost:3000/products?_limit=3   `);
  }
  trendyProducts() {
    return this.http.get<product[]>(`http://localhost:3000/products?_limit=100`);
  }
  // searchProducts(query: string) {
  //   return this.http.get<product[]>(`http://localhost:3000/products?category=${query}`);
  // }
  searchProducts(query: string) {
    return this.http.get<product[]>(`http://localhost:3000/products?category=${query}`);
  }


 

  localAddToCart(data: product) {
    let cartData: product[] = [];
    let localCart = localStorage.getItem('localCart');

    try {
      if (!localCart) {
        localStorage.setItem('localCart', JSON.stringify([data]));
        console.warn("Cart initialized with a new product.");
      } else {
        cartData = JSON.parse(localCart);
        cartData.push(data);
        localStorage.setItem('localCart', JSON.stringify(cartData));
        console.warn("Product added to cart.");
      }

      // Emit updated cart data
      this.cartData.emit(cartData);
    } catch (error) {
      console.error('Error while adding product to cart:', error);
    }
  }

  removeItemFromCart(productId: string) {
    let cartData = localStorage.getItem('locaCart')
    if (cartData) {
      let items: product[] = JSON.parse(cartData)
      items = items.filter((item: product) =>
        item.id !== productId);
      console.warn(items);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }


 

  addToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }
 
  removeToCart(cartId: string) {
    return this.http.delete('http://localhost:3000/cart/' + cartId);
}

  // getCartList(userId: number) {
  //   return this.http.get<product[]>('http://localhost:3000/cart?userId='+ userId,
  //     { observe: 'response' }).subscribe((result) => {
  //       if (result && result.body) {
  //         console.warn(result)
  //         this.cartData.emit(result.body)
  //       }
  //     })
  // }
  getCartList(userId: number) {
    return this.http
      .get<product[]>('http://localhost:3000/cart?userId=' + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          console.warn(result);
          this.cartData.emit(result.body);
        }
      });
  }
  currentcart() {
    let userstore = localStorage.getItem('user');
    let userData = userstore && JSON.parse(userstore);
    return this.http.get<cart[]>(`http://localhost:3000/cart?userId` + userData.id)
  }
  orderNow(data: orders) {
    return this.http.post(`http://localhost:3000/orders`, data)
  }

  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore)
    return this.http.get<orders[]>(`http://localhost:3000/orders?userId=` + userData.id)
  }
  deleteCartItems(cartId: string) {
    return this.http.get<orders[]>(`http://localhost:3000/orders?userId=` + cartId, { observe: 'response' }).subscribe((result) => {
      if (result) {
        this.cartData.emit([])
      }
    })
  }
  cancelOrder(orderId:string)
  {
    return this.http.delete(`http://localhost:3000/orders/`+orderId);
  }
}
