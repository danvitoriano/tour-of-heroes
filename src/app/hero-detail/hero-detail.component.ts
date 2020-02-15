import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  constructor(
    private activatedRoute : ActivatedRoute,
    private location : Location,
    private heroService: HeroService
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void{
    let id = +this.activatedRoute.snapshot.paramMap.get("id");

    this.heroService.getHero(id).subscribe(
      hero => this.hero = hero 
    )

  }

  save(): void {
    this.heroService.updateHero(this.hero)
    .subscribe( () => this.goBack())
  }

  goBack(): void {
    this.location.back();
  }

}
