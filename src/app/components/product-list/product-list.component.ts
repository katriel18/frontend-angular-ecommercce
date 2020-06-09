import { Component, OnInit } from '@angular/core';

import { ProductService } from './../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products:Product[];
  currentCategoryId:number=1;
  previusCategoryId: number=1;
  searchMode:boolean=false;

//Propiedades de la paginacion
  thePageNumber:number=1;
  thePageSize:number=5;
  theTotalElements:number=0;

  previousKeyword:String=null;

  constructor(private productService:ProductService,private route:ActivatedRoute
    ,private cartService:CartService) { }

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
   

    if(this.previusCategoryId!=this.currentCategoryId){
      this.thePageNumber=1;
    }

    this.previusCategoryId=this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId},thePageNumber=${this.thePageNumber}`);

    this.productService.getProductListPaginate(this.thePageNumber-1,
      this.thePageSize,
      this.currentCategoryId).subscribe(
      
        this.processResult()
        
    );
  }
  processResult() {
    return data=>{
      this.products=data._embedded.products;
      this.thePageNumber=data.page.number+1;
      this.thePageSize=data.page.size;

      this.theTotalElements=data.page.totalElements;
    }
  }

  handleSearchProducts(){

      const theKeyword:string=this.route.snapshot.paramMap.get('keyword');

            
      if(this.previousKeyword!=theKeyword){
        this.thePageNumber=1;
      }

      this.previousKeyword=theKeyword;

      console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);


    /*  this.productService.searchProducts(theKeyword).subscribe(
        data=>{
          this.products=data;
        }
      );*/


      this.productService.searchProductsPaginate(this.thePageNumber-1,this.thePageSize
        ,theKeyword).subscribe(this.processResult() );

  }

  updatePageSize(pageSize:number){
    
  this.thePageSize=pageSize;
  this.thePageNumber=1;
  this.listProducts();
  }


  addToCart(theProduct: Product){

    //debugging
    console.log(`adding to cart = ${theProduct.name} , ${theProduct.unitPrice}`);
    //real

    const theCartItem=new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }
}
 
