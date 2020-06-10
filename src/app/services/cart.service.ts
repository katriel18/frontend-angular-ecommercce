import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  

  cartItems:CartItem[]=[];

  totalPrice:Subject<number>=new Subject<number>();
  totalQuantity:Subject<number>=new Subject<number>();
  
  constructor() { }

  addToCart(theCartItem:CartItem){

    let alreadyExistsInCart:boolean=false;//VARIABLE LOCAL
    let existingCartItem:CartItem=undefined;//VARIABLE LOCAL


    if(this.cartItems.length>0){

      /*
      for(let temp of this.cartItems){
        if(temp.id===theCartItem.id){
          existingCartItem=temp;//REFERENCIA AL PRODUCTO EXISTENTE
          break;
        }
      }*/
      //BUCLE REFACTORIZADO
      existingCartItem=this.cartItems.find(temp=>temp.id===theCartItem.id);


      alreadyExistsInCart=(existingCartItem!=undefined);

    }

    if(alreadyExistsInCart){
      existingCartItem.quantity++;//MODIFICA LA VARIABLE DEL ARRAY POR REFERENCIA
    }else{
      this.cartItems.push(theCartItem);
    }

    this.computeCartTotal();

  }


  computeCartTotal() {

    
    let totalPriceValue:number=0.00;
    let totalQuantityValue:number=0;

    for(let temp of this.cartItems){

      totalPriceValue+=temp.quantity*temp.unitPrice;
      totalQuantityValue+=temp.quantity;
      
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    //debugger
    this.logCartData(totalPriceValue,totalQuantityValue);

  }


  logCartData(totalPriceValue: number, totalQuantityValue: number) {

    console.log('CONTENTS OF THE CART');
    for(let temp of this.cartItems){  

      const subtotalPrice=temp.quantity*temp.unitPrice;

      console.log(`name :${temp.name} ,quantity:${temp.quantity}, price:${temp.unitPrice} , subtotalPrice=${subtotalPrice}`);

    }

    console.log(`TOTAL PRICE:${totalPriceValue.toFixed(2)} ,TOTAL QUANTITY:${totalQuantityValue}`);
    console.log('-----------');
  
  }


  /////////////////////////////////////////////////////////////////////////////////////////
  
  decrementQuantity(theCarItem: CartItem) {
    
    theCarItem.quantity--;
    if(theCarItem.quantity===0){
      this.remove(theCarItem);

    }else{
      this.computeCartTotal();
    }
  }
   /////////////////////////////////////////////////////////////////////////////////////////
 
  remove(theCartItem: CartItem) {
    const itemIndex=this.cartItems.findIndex(temp=>temp.id===theCartItem.id);

    if(itemIndex>-1){

      this.cartItems.splice(itemIndex,1);
      this.computeCartTotal();
    }


  }




}

/*
Splice recibe varios argumentos, el primer parámetro es el indice de inicio, 
desde donde se realizará la operación.

El siguiente parametro nos sirve para indicar
 cuantos elementos se eliminaran desde el indice de inicio.
*/