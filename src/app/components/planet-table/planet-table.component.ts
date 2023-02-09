import { Component, Input, DoCheck } from '@angular/core';
import { IPlanet, IResident } from '../../shared/interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { PlanetsDataService } from '../../shared/planets-data.service';
import { MatDialog } from '@angular/material/dialog';
import { ResidentsModalComponent } from '../residents-modal/residents-modal.component'


@Component({
  selector: 'app-planet-table',
  templateUrl: './planet-table.component.html',
  styleUrls: ['./planet-table.component.scss']
})

export class PlanetTableComponent implements DoCheck {
  constructor(public dialog: MatDialog, public planetsDataService: PlanetsDataService) {}
  @Input() public planets: Array<IPlanet> = [];

  displayedColumns: string[] = ['name', 'diameter', 'climate', 'population'];
  dataSource: MatTableDataSource<IPlanet>;
  

  ngDoCheck() {
    this.dataSource = new MatTableDataSource<IPlanet>(this.planets);
  }


  getAllResidents(planetName: string) {
    const choosenPlanet: IPlanet = this.findChoosenPlanet(planetName);
    if (choosenPlanet.residents.length) {
      this.planetsDataService.getAllResidents(choosenPlanet.residents)
      .subscribe((res:Array<IResident>) => {
        this.openDialog(res);
      });
    } else {
      this.openDialog();
    }
  }


  private findChoosenPlanet(name: string): IPlanet {
    return this.planets.find((planet: IPlanet): boolean => planet.name === name)!;
  }


  openDialog(residents?: Array<IResident>): void {
    this.dialog.open(ResidentsModalComponent, {
      data: residents,
      width: '40%'
    });
  }
}
