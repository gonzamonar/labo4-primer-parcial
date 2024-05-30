import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataGithubService {
  API_URL: string = 'https://api.github.com/users/';

  constructor(
    private http: HttpClient
  ) { }
  
  fetchUserData(usuario: string): Observable<any>{
    return this.http.get(this.API_URL + usuario);
  }
}
