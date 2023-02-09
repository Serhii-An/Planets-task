import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IResident } from '../../shared/interfaces';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-residents-modal',
  templateUrl: './residents-modal.component.html',
  styleUrls: ['./residents-modal.component.scss']
})
export class ResidentsModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Array<IResident>) { }

  displayedColumns: string[] = ['name', 'height', 'birth_year'];
  dataSource = new MatTableDataSource<IResident>(this.data);
}
