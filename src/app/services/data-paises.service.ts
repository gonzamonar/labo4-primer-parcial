import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataPaisesService {
  API_URL: string = 'https://restcountries.com/v3.1/';

  constructor(
    private http: HttpClient
  ) { }
  
  fetchAll(): Observable<any> {
    return this.http.get(this.API_URL + 'all');
  }

  fetchOne(pais: string): Observable<any> {
    return this.http.get(this.API_URL +'name/' + pais);
  }

}
