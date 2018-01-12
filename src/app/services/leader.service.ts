import { Injectable } from '@angular/core';

import { Leader } from '../shared/leader';
import { LEADER } from '../shared/leaders';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class LeaderService {

  constructor() { }

   getLeaders(): Observable<Leader[]>{
    //  return new Promise(resolve=>{
    //     setTimeout(()=>resolve(LEADER), 2000);
    //  });
    return Observable.of(LEADER).delay(2000);
     //return Promise.resolve(LEADER);
   }
   getLeader(id:number) : Observable<Leader>{
    //  return new Promise (resolve=>{
    //    setTimeout(()=> resolve(LEADER.filter((leader)=> (leader.id === id))[0]), 2000);
    //  });
    return Observable.of(LEADER.filter((leader)=> (leader.id === id))[0]).delay(2000);
     //return  Promise.resolve(LEADER.filter((leader)=> (leader.id === id))[0]);
   }
   getFeaturedLeader(): Observable<Leader>{
    //  return new Promise (resolve=>{
    //    setTimeout(()=> resolve(LEADER.filter((leader)=> leader.featured)[0]), 2000);
    //  });
    return Observable.of(LEADER.filter((leader)=> leader.featured)[0]).delay(2000);
     //return  Promise.resolve(LEADER.filter((leader)=> leader.featured)[0]);
   }

}
