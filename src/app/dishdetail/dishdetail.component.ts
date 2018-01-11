import { Component, OnInit, Input } from '@angular/core';

import { Dish } from '../shared/dish';

import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  // @Input()
  dish: Dish;

  constructor(private dishService: DishService,
  private route: ActivatedRoute,
  private location: Location) { }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    this.dishService.getDish(id).then(dish=> this.dish = dish);
  }

  goBack(): void {
    this.location.back();
  }

}

var obj = [
  {
    title: 'Domestic', 
    data:[
      {title:"All Request", data : [{id: 9, count: 2}, {id:10, count: 8}]},
      {title:"Approved", data : [{id: 9, count: 8}, {id:10, count: 3}]},
      {title:"Rejected", data : [{id: 9, count: 4}, {id:10, count: 3}]}
      ]
  }
  ]
