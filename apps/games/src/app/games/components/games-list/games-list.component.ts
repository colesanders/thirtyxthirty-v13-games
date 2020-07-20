import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Game } from '@thirty/api-interfaces';

@Component({
  selector: 'thirty-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit {
  @Input() games: [Game];
  @Output() selected = new EventEmitter<Game>();
  @Output() deleted = new EventEmitter<Game>();
  constructor() { }

  ngOnInit(): void {
  }

}
