export interface Message {
  message: string;
}

export interface Bike {
  "id": string,
  "brand": string,
  "year": number,
  "style": string,
  "extras": string[]
}

export interface Fruit {
  "id": string,
  "name": string,
  "description": string,
  "color": string,
  "favorite": boolean,
  "icon" : string,
  "amount": number,
}

export interface Lesson {
  "id": string,
  "title": string,
  "description": string,
  "favorite": boolean,
  "percentComplete": number,
}

export interface TvShow {
  "id": string,
  "name": string,
  "description": string,
  "type": string,
  "price": number,
  "stars": number,
}

export interface Game {
  "id": string,
  "name": string,
  "description": string,
  "rating": string,
  "price": number,
}

export interface Pizza {
  "id": string,
  "sauce": string,
  "cheese": string,
  "crust": string,
  "extras": string[],
  "price": number,
}

export interface Computer {
  "id": string,
  "cpu": string,
  "gpu": string,
  "ram": number,
  "extras": string[],
  "price": number,
}

export interface Car {
  "id": string,
  "type": string,
  "description": string,
  "color": string,
  "price": number,
}

export interface Login {
  "id": string,
  "username": string,
  "password": string,
  "logged_in": boolean,
}
