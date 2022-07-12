import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Rider } from '../_models/rider';

@Injectable({
  providedIn: 'root'
})
export class RidersService {
  baseUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }

  getRidersHandler(){
    return this.http.get<Rider[]>(this.baseUrl + 'users');
  }

  getRiderHandler(username:string){
    return this.http.get<Rider>(this.baseUrl + 'users/' + username);
  }
}
