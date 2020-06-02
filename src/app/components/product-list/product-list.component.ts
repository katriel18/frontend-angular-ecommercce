import { Component, OnInit } from '@angular/core';

import { ProductService } from './../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products:Product[];
  currentCategoryId:number;

  searchMode:boolean;

  constructor(private productService:ProductService,private route:ActivatedRoute) { }

  //post constructor
  ngOnInit(): void {
    //E SUBCRIPE HAE QUE ACTUE SINCRONICAMENTE EL LISTADO  Y OIR A LAS PETICIONES EN TRANTES
    this.route.paramMap.subscribe(()=>{this.listProducts();});
    
    //this.listProducts();
   
  }

  listProducts(){
    
    this.searchMode=this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchProducts();
    }else{
      this.handleListProducts();
    }
  }

  handleListProducts(){

    const hasCategoryId:boolean=this.route.snapshot.paramMap.has('id');
  
    if(hasCategoryId){
      this.currentCategoryId=+this.route.snapshot.paramMap.get('id');
    }else{
      this.currentCategoryId=1;
    }
   
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data=>{
        this.products=data;
      }
    )
  }

  handleSearchProducts(){

      const theKeyword:string=this.route.snapshot.paramMap.get('keyword');

      this.productService.searchProducts(theKeyword).subscribe(
        data=>{
          this.products=data;
        }
      );


  }


}
 
