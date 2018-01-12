import { Component, OnInit, Input } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment'

import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  // @Input()
  dish: Dish;
  ratingForm: FormGroup;
  comment: Comment;
  formErrors = {
    'author': '',
    'comment': ''
  };
 date:string = this.getDateString(new Date());

 getDateString (date:Date){
   var months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
   var dateString = months[date.getMonth()] + " " + date.getDate() + ', ' + date.getFullYear();
   console.log(dateString);
   return dateString;
 }

  validationMessages = {
    'author': {
      'required':      'Author Name is required.',
      'minlength':     'Author Name must be at least 2 characters long.',
      'maxlength':     'Author Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'commnet is required.',
    },
  };

  dishIds: number[];
  prev: number;
  next: number;

  constructor(private dishService: DishService,
  private route: ActivatedRoute,
  private location: Location, 
  private fb: FormBuilder) { }

  ngOnInit() {
    // let id = +this.route.snapshot.params['id'];
    // this.dishService.getDish(id).subscribe(dish=> this.dish = dish);
    //simple swthich map
    // this.route.params
    // .switchMap((params: Params) => this.dishService.getDish(+params['id']))
    // .subscribe(dish=> this.dish = dish)

    //for prev next
    this.route.params
    .switchMap((params: Params) => this.dishService.getDish(+params['id']))
    .subscribe(dish=> { this.dish = dish ; this.setPrevNext(dish.id); });

    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.createForm();
  }
  
  createForm(){
    this.ratingForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      rating: 0,
      comment: ['', Validators.required ]
    });

    this.ratingForm.valueChanges
    .subscribe(data => this.onValueChanges(data));
  }

  onValueChanges (data?:any){
    if (!this.ratingForm) { return; }
    const form = this.ratingForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    this.comment = this.ratingForm.value;
    //this.date = new Date();
    console.log(this.comment, this.date);
    this.comment.date =  this.getDateString(new Date());
    this.dish.comments.push(this.comment);
    this.ratingForm.reset({
      author: '',
      rating:0 ,
      comment:''
    });
  }

  setPrevNext (dishId: number){
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

}

