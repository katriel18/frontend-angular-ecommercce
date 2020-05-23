import { Component, OnInit } from '@angular/core';

import { ProductService } from './../../services/product.service';
import { Product } from '../../common/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products:Product[];
  constructor(private productService:ProductService) { }

  //post constructor
  ngOnInit(): void {
    this.listProducts();
    
    this.listPrueba();//PRUEBA
  }

  listProducts(){
    this.productService.getProductList().subscribe(
      data=>{
        this.products=data;
      }
    )
  }

  //////////////////////////////////DATOS DE PRUEBA////////////////////////////////

  datos:any[];

  listPrueba(){
    this.datos=[
      {
        "imageUrl":"assets/images/products/placeholder.png",
        "name":"Cafe",
      "unitPrice":10,
      "unitsInStock":20,
      },
      {
        "imageUrl":"assets/images/products/placeholder.png",
        "name":"Cafe",
      "unitPrice":10,
      "unitsInStock":20}
    ]
  }
  ///////////////////////////////////////////////////////////////
}
