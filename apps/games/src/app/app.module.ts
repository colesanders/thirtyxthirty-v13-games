import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CoreStateModule } from '@thirty/core-state';
import { CoreDataModule } from '@thirty/core-data';
import { MaterialModule } from '@thirty/material';
import * as fromGames from '@thirty/core-state';

import { AppComponent } from './app.component';
import { GamesComponent } from './games/games.component';
import { GamesOverviewComponent } from './games/components/games-overview/games-overview.component';
import { GamesDetailComponent } from './games/components/games-detail/games-detail.component';
import { GamesListComponent } from './games/components/games-list/games-list.component';
import { LoginComponent } from './login/login.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'game', component: GamesComponent},
  { path: 'login', component: LoginComponent},
  { path: '404', component: FourOhFourComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '**', component: FourOhFourComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    GamesOverviewComponent,
    GamesDetailComponent,
    GamesListComponent,
    LoginComponent,
    FourOhFourComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    RouterModule,
    CoreStateModule,
    CoreDataModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(fromGames.gamesReducer, {}),
    EffectsModule.forRoot([fromGames.GamesEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}


