import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { orders } from '../data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orderData: orders[] | undefined
  constructor(private product: ProductsService) { }
  ngOnInit(): void {
    this.getOrderList();
  }

  // cancelOrder(orderId:string|undefined)
  // {
  //   orderId && this.product.cancelOrder(orderId).subscribe((result)=>
  //   {
  //     this.getOrderList();
  //     confirm("are you sure  to Cancel Order");
  //   })
  // }
  cancelOrder(orderId: string | undefined) {
    if (orderId) {
      const confirmation = confirm("Are you sure you want to cancel the order?");
      
      if (confirmation) {
        this.product.cancelOrder(orderId).subscribe((result) => {
          this.getOrderList();
        });
      } else {
        // Handle cancellation
        console.log("Order cancellation cancelled.");
      }
    } else {
      console.log("No orderId provided.");
    }
  }
getOrderList()
{
  this.product.orderList().subscribe((result) => {
    this.orderData = result;
  })
}

}
