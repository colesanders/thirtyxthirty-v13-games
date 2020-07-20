import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GamesFacade } from '@thirty/core-state'
import { Game } from '@thirty/api-interfaces';

import { Animations } from './gamesAnimations';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'thirty-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  animations: Animations,
})
export class GamesComponent implements OnInit {
  games$: Observable<Game[]> = this.gameFacade.allGames$;
  game$: Observable<Game> = this.gameFacade.selectedGame$;
  detailOpen = false;

  constructor(
    private gameFacade: GamesFacade,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.gameFacade.loadGames();
  }

  refresh(trigger: string){
    this.focusoutDetail();
    this.openSnackBar('Game ' + trigger, 'Okay', 1000);
    this.gameFacade.resetSelectedGame();
    this.gameFacade.loadGames();
  }

  openSnackBar(message: string, action: string, time: number) {
    this.snackBar.open(message, action, {
      duration: time,
    });
  }

  focusDetail(){
    this.detailOpen = true;
  }

  focusoutDetail(){
    this.detailOpen = false;
  }

  select(game: Game): void{
    this.gameFacade.selectGame(game.id);
    this.focusDetail();
  }

  delete(game: Game): void{
    this.gameFacade.deleteGame(game);

    this.refresh('Deleted');
  }

  save(game: Game): void{
    if(game.id !== null){
      this.gameFacade.updateGame(game);
      this.refresh('Updated');
    }else {
      this.gameFacade.createGame(game);
      this.refresh('Created');
    }
  }

  cancel(): void{
    this.focusoutDetail();
    this.gameFacade.resetSelectedGame();
  }

}
