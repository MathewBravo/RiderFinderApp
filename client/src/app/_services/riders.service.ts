import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rider } from '../_models/rider';

@Injectable({
  providedIn: 'root'
})
export class RidersService {
  baseUrl = environment.apiUrl;
  riders: Rider[] = [];

  constructor(private http: HttpClient) { }

  getRidersHandler(){
    if(this.riders.length > 0) {
      return of(this.riders); // return observable of riders
    }
    return this.http.get<Rider[]>(this.baseUrl + 'users').pipe(map(riders => {
      this.riders = riders;
      return riders;
    }));
  }

  getRiderHandler(username:string){
    const rider = this.riders.find(r => r.userName === username);
    if (rider !== undefined) {
      return of(rider);
      //find returns undefined if not found
    }
    return this.http.get<Rider>(this.baseUrl + 'users/' + username);
  }

  updateRiderHandler(rider:Rider){
    return this.http.put(this.baseUrl + 'users/', rider).pipe(
      map(() => {
        const riderIndex = this.riders.indexOf(rider);
        this.riders[riderIndex] = rider;
      })
    )
  }
}
