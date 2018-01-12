import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

import { Observable } from 'rxjs/Observable';



@Injectable()
export class PromotionService {

  constructor() { }
   getPromotions() : Observable<Promotion []>{
    //  return new Promise(resolve=>{
    //    setTimeout(() => resolve(PROMOTIONS), 2000);
    //  });
    return Observable.of(PROMOTIONS).delay(2000);
     //return  Promise.resolve(PROMOTIONS);
   }

   getPromotion(id:number): Promise < Promotion > {
     return new Promise(resolve=>{
       setTimeout(() => resolve(PROMOTIONS.filter(promotion => (promotion.id === id))), 2000);
     });
     //return Observable.of(PROMOTIONS.filter((promo) => (promo.id == id))).delay(2000).toPromise();
     //return  Promise.resolve(PROMOTIONS.filter((promotion)=>(promotion.id === id))[0]);
   }

   getFeaturedPromotion(): Observable<Promotion> {
    //   return new Promise(resolve=>{
    //    setTimeout(() => resolve(PROMOTIONS.filter((promotion)=>(promotion.featured))[0]), 2000);
    //  });
     return Observable.of(PROMOTIONS.filter((promotion)=>(promotion.featured))[0]).delay(2000);
     ///return  Promise.resolve(PROMOTIONS.filter((promotion)=>(promotion.featured))[0]);
   }

}
