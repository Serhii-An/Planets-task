import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY, from } from 'rxjs';
import { expand, reduce, tap, mergeMap, scan, last } from 'rxjs/operators';
import { IResponse, IPlanet, IResident } from './interfaces';

@Injectable({
  providedIn: 'root'
})

export class PlanetsDataService {
  constructor(private http: HttpClient) { }

  baseUrl: string = 'https://swapi.dev/api/planets/';
  isLoading: boolean = true;

  getData = (url: string = this.baseUrl): Observable<IResponse> => this.http.get<IResponse>(url);


  getAllResidents(urls: Array<string>):  Observable<Array<IResident>> {
    this.isLoading = true;
    return from(urls).pipe(
      mergeMap((url: string) => this.http.get<IResident>(url)),
      scan((acc: Array<IResident>, cur: IResident): Array<IResident> => [...acc, cur], []),
      last(),
      tap((): boolean => this.isLoading = false)
    ); 
  }


  getPlanetsData(url: string = this.baseUrl): Observable<Array<IPlanet>> {
    return this.getData(url).pipe(
      expand((response: IResponse): Observable<IResponse> => response.next ? this.getData(response.next) : EMPTY),
      reduce((acc: Array<IPlanet>, current: IResponse): Array<IPlanet> => acc.concat(current.results), []),
      tap((): boolean => this.isLoading = false)
      )
    }
}
