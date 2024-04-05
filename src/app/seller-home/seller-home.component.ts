import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductsService } from '../services/products.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { faSort } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product[];
  productMessage: undefined | string;
  icon = faTrash;
  editIcon = faEdit;
  sort = faSort;

  constructor(private product: ProductsService) { }
  ngOnInit(): void {
    this.list();
  }
  list() {
    this.product.productList().subscribe((result) => {
      console.warn(result)
      this.productList = result;
    })
  }

  // deleteProduct(id: any) {
  //   console.warn("test id", id)
  //   this.product.deleteProduct(id).subscribe((result) => {
  //     if (result) {
  //       this.productMessage = ' Product is deleted';
  //       this.list();
  //     }
  //   })
  //   setTimeout(() => (this.productMessage = undefined), 3000
  //   );
  // }
  deleteProduct(id: any) {
    const confirmation = confirm("Are you sure you want to delete this product?");
  
    if (confirmation) {
      console.warn("test id", id);
      this.product.deleteProduct(id).subscribe((result) => {
        if (result) {
          this.productMessage = 'Product is deleted';
          this.list(); // Assuming list() is a function to refresh the product list
        }
      });
      setTimeout(() => {
        this.productMessage = undefined;
      }, 3000);
    } else {
      console.log("Product deletion cancelled.");
    }
  }
  
  // sorting  list by name =========================================================================

  sortbyName() {
    this.list();
    this.product.productList().subscribe((result) => {
      console.warn(result)
      if (result) {
        this.productList = result.sort((a, b) => a.name.localeCompare(b.name));

      }
    })
  }
  sortbyprice() {
    this.list();
    this.product.productList().subscribe((result) => {
      if (result) {
        this.productList = result.sort((a, b) => a.price - b.price)
      }
    })
  }
  //==============
  hasSpecialCharacters(description: string): boolean {
    const regex = /^[!@^$]+$/;

    return regex.test(description);
  }
}

