import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';

import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

//private baseURL='http://localhost:8080/api/products';
//private baseURL='http://ecommerce-18.herokuapp.com/api/products?size=100';//retorna todos los productos
private baseURL='http://ecommerce-18.herokuapp.com/api/products';

private categoryURL='http://ecommerce-18.herokuapp.com/api/product-category';

  constructor(private httpClient : HttpClient) { }




  ///////////////////////////////////////////////////////////////////////////
  getProduct(theProductId:number):Observable <Product> {
    
    const productURL=`${this.baseURL}/${theProductId}`;
    return this.httpClient.get<Product>(productURL);
  }


  ///////////////////////////////////////////////////////////////////////////
  getProductList(theCategoryId:number): Observable <Product[]>{

    const searchUrl=`${this.baseURL}/search/findByCategoryId?id=${theCategoryId}`;

    return this.newMethod(searchUrl);

  }

  ///////////////////////////////////////////////////////////////////////////
  searchProducts(theKeyword: string): Observable <Product[]> {

    const serchUrl=`${this.baseURL}/search/findByNameContaining?name=${theKeyword}`;

    return this.newMethod(serchUrl);
  }
 
//////////////////////////REFACTORIZACION//////////////////////////////////////
  private newMethod(serchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(serchUrl).pipe(map(response => response._embedded.products));
  }

  ///////////////////////////////////////////////////////////////////////////
  getProductCategories() {
    
    return this.httpClient.get<GetResponseProductCategory>(this.categoryURL).pipe(
      map(response=>response._embedded.productCategory)
    );
    
  }

}


//LO USAMOS PARA LLAMAR A ESA API-REST

interface GetResponseProducts{
  _embedded:{
    products:Product[]
  }

}


interface GetResponseProductCategory{
  _embedded:{
    productCategory:ProductCategory[]
  }

}