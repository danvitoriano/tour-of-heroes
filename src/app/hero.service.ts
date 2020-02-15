import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { MessageService } from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes'

  getHeroes() : Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    )
    
  }
  getHero(id:number): Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`
    return this.http.get<Hero>(url)
    .pipe(
      tap(_ => this.log(`fetched hero id ${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )
  }

  constructor(
    private messageService: MessageService, 
    private http: HttpClient
  ) { }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }

  private handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.log(error)
      this.log(`${operation} failed: ${error.message}`)
      return of(result as T)
    }
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
    .pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  

}
