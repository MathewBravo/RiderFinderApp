import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
    baseUrl = environment.apiUrl;

    // observable to store the user
    private currentUserSubject = new ReplaySubject<User>(1);
    currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { 

  }

  loginHandler(model: any){
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
        map((response: User) => {
            const user = response;
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }
        })
    );
  }

  registerHandler(model: any){
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
        map((response: User) => {
          const user = response;
          if(user){
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
        })
    );
  }

  setCurrentUser(user: User){
    this.currentUserSubject.next(user);
  }

  logoutHandler(){
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }
}
