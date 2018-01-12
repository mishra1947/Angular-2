import { Injectable } from '@angular/core';

import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay'; 

@Injectable()
export class DishService {

  constructor() { }

  getDishes() : Observable<Dish[]>{
    //1  return new Promise(resolve=> {
    //   // Simulate server latency with 2 second delay
    //     setTimeout(() => resolve(DISHES), 2000);
    // });
    //2 return Promise.resolve(DISHES);
    //3
    //return Observable.of(DISHES).delay(2000).toPromise();
    return Observable.of(DISHES).delay(2000);
  }

  getDish(id:number) : Observable<Dish> {
    // return new Promise (resolve=>{
    //   setTimeout(()=> resolve(DISHES.filter((dish)=>(dish.id === id))[0]),2000)
    // });
    // return Promise.resolve(DISHES.filter((dish)=>(dish.id === id))[0]);
    return Observable.of(DISHES.filter((dish)=>(dish.id === id))[0]).delay(2000);
  }

  getFeaturedDish() : Observable<Dish>{
    //  return new Promise (resolve=>{
    //   setTimeout(()=> resolve(DISHES.filter((dish)=>(dish.featured))[0]),2000)
    // });
    return Observable.of(DISHES.filter((dish)=>(dish.featured))[0]).delay(2000);
    //return Promise.resolve(DISHES.filter((dish)=>(dish.featured))[0]);
  }

  getDishIds () : Observable < number[] >{
    return Observable.of(DISHES.map(dish => dish.id ));
  }

}
