import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Game } from '@thirty/api-interfaces';


@Component({
  selector: 'thirty-games-detail',
  templateUrl: './games-detail.component.html',
  styleUrls: ['./games-detail.component.scss']
})
export class GamesDetailComponent implements OnInit, OnChanges{
  @Input() game: Game;
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  gameForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createFormGroup();
  }

  ngOnChanges(){
    if(this.gameForm && this.game){
      this.gameForm.patchValue(this.game)
    } else if(this.gameForm){
      this.cancel();
    }
  }

  cancel(){
    this.gameForm.reset();
    this.gameForm.value.price = 0;
  }

  createFormGroup(){
    this.gameForm = this.formBuilder.group({
      id: [],
      name: new FormControl('', [
        Validators.required,
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
      rating: new FormControl('', [
        Validators.required
      ]),
      price: new FormControl(0, [
        Validators.required,
      ])
    })
  }
}
