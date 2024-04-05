import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  constructor(public productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts() 

  }

  loadProducts() {
    return this.productService.getProducts().subscribe(
      (data: any) =>console.log('data: ', data)
    )

  }

}
