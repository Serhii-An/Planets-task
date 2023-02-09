import { Component, Input, Output, OnChanges, EventEmitter  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { IPlanet } from '../../shared/interfaces';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-planet-selector',
  templateUrl: './planet-selector.component.html',
  styleUrls: ['./planet-selector.component.scss']
})
export class PlanetSelectorComponent implements OnChanges  {
  @Input() planets: Array<IPlanet>;
  @Output() changePlanet: EventEmitter<IPlanet[]> = new EventEmitter<IPlanet[]>();

  planetsControl = new FormControl('');
  options: string[];
  filteredOptions: Observable<string[]>;
  choosenPlanet: Array<IPlanet> = [];

  ngOnChanges() {
    this.options = this.planets.map((planet: IPlanet): string => planet.name);
      this.filteredOptions = this.planetsControl.valueChanges.pipe(
        startWith(''),
        map((value: string | null): string[]  => this._filter(value || '')),
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option: string) => option.toLowerCase().includes(filterValue));
  }

  public choosePlanet(name: string): void {
    this.choosenPlanet[0] = this.planets.find((planet: IPlanet): boolean => planet.name === name)!;
    this.changePlanet.emit(this.choosenPlanet);
  }
}
