import { Injectable } from '@angular/core';
import {InMemoryDbService } from 'angular-in-memory-web-api'
import {Hero} from './hero'

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb(){
    const heroes = [
      { id: 11, name: 'Vinicius' },
      { id: 12, name: 'Ricardo' },
      { id: 13, name: 'Danilo' },
      { id: 14, name: 'Rodrigo' },
      { id: 15, name: 'Danilo' },

    ]
    return {heroes}
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 5
  }

  constructor() { }
}
