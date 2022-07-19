import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/paginations';
import { Rider } from '../_models/rider';
import { RiderRoutes } from '../_models/riderroutes';

@Injectable({
  providedIn: 'root'
})
export class RidersService {
  baseUrl = environment.apiUrl;
  riders: Rider[] = [];
  paginatedResults: PaginatedResult<Rider[]> = new PaginatedResult<Rider[]>();


  constructor(private http: HttpClient) { }

  getRidersHandler(page? : number, itemsPerPage? : number){
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }
    // when you observe a response, you get a response object not the body
    return this.http.get<Rider[]>(this.baseUrl + 'users', {observe: 'response', params}).pipe(map(response =>{
      this.paginatedResults.result = response.body;
      if( response.headers.get('Pagination') != null){
        this.paginatedResults.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return this.paginatedResults;
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

  deleteRouteHanlder(routeId: number){
    return this.http.delete(this.baseUrl + 'users/delete-route/' + routeId);
  }

  addRouteHandler(route: RiderRoutes){
    return this.http.put(this.baseUrl + 'users/add-route/', route);
  }
}
