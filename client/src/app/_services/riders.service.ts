import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Rider} from '../_models/rider';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
  })
};

@Injectable({
  providedIn: 'root'
})
export class RidersService {
  baseUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }

  getRidersHandler(){
    return this.http.get<Rider[]>(this.baseUrl + 'users', httpOptions);
  }

  getRiderHandler(username:string){
    return this.http.get<Rider>(this.baseUrl + 'users/' + username, httpOptions);
  }
}
