import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/paginations';
import { Rider } from '../_models/rider';
import { RiderRoutes } from '../_models/riderroutes';
import { UserParams } from '../_models/userParams';

@Injectable({
  providedIn: 'root'
})
export class RidersService {
  baseUrl = environment.apiUrl;
  riders: Rider[] = [];
  riderCache = new Map();


  constructor(private http: HttpClient) { }

  getRidersHandler(userParams : UserParams){
    var res = this.riderCache.get(Object.values(userParams).join('-'));
    if(res){ 
      return of(res);
    }
    
    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
    
    params = params.append('minFtp', userParams.minFtp.toString());
    params = params.append('maxFtp', userParams.maxFtp.toString());
    params = params.append('orderBy', userParams.orderBy.toString());
    // when you observe a response, you get a response object not the body
    return this.getPaginatedResult<Rider[]>(this.baseUrl + 'users', params).pipe(
      map(response => {
      this.riderCache.set(Object.values(userParams).join('-'), response);
      return response;
    }));
  }

  private getPaginatedResult<T>(url, params) {
    const paginatedResults: PaginatedResult<T> = new PaginatedResult<T>();
    return this.http.get<T>(this.baseUrl + 'users', { observe: 'response', params }).pipe(
      map(response => {
      paginatedResults.result = response.body;
      if (response.headers.get('Pagination') != null) {
        paginatedResults.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResults;
    }));
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number){
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return params;
  }

  getRiderHandler(username:string){
    const rider = [...this.riderCache.values()].reduce((acc, curr) => {
      return acc.concat(curr.result);
    }
    , []).find(r => r.username === username);
    //return of(rider);
    return this.http.get<Rider>(this.baseUrl + 'users/' + username);
    // const rider = this.riders.find(r => r.userName === username);
    // if (rider !== undefined) {
    //   return of(rider);
    //   //find returns undefined if not found
    // }
    
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
