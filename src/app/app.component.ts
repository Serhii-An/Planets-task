import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { PlanetsDataService } from './shared/planets-data.service';
import { IPlanet } from './shared/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(public planetsDataService: PlanetsDataService) {}

  planets: Array<IPlanet> = [];
  public selectedPlanet: Array<IPlanet> = [];

  setSelectedPlanet(planet: Array<IPlanet>) {    
    this.selectedPlanet = planet;
  }

  ngOnInit(): void {
    this.planetsDataService.getPlanetsData().subscribe((response: Array<IPlanet>): void => {
      this.planets = response;
    });
  }
}
