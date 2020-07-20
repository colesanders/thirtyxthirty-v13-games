import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from '@thirty/api-interfaces';
import { Observable } from 'rxjs';

export const BASE_URL = 'https://thirtyxthirty-lessons.herokuapp.com/games';


@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { }

  all(): Observable<[Game]>{
    return this.http.get<[Game]>(BASE_URL);
  }

  byId(id): Observable<Game>{
    return this.http.get<Game>(BASE_URL + '/' + id);
  }

  create(game: Game): Observable<Game>{
    return this.http.post<Game>(BASE_URL, game);
  }

  update(game: Game): Observable<Game>{
    return this.http.put<Game>(BASE_URL + '/' + game.id, game);
  }

  delete(id): Observable<Game>{
    return this.http.delete<Game>(BASE_URL + '/' + id);
  }
}
