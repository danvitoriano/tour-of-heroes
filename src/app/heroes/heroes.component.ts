import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes : Hero[];
  selectHero : Hero;

  hero: Hero = {
    id: 1,
    name: 'Spider'
  }
  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getHeroes()
  }

  onSelect(hero: Hero):void{
      this.selectHero = hero
      this.messageService.add(`Hero Service: Selected hero "id=${hero.id}"`);
  }

  getHeroes() : void {
    this.heroService.getHeroes().subscribe(
      heroes => this.heroes = heroes 
    )
  }

}
