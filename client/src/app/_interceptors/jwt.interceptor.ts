import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { take } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser: User;
    // take is used to get the first value of the observable and then unsubscribe
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user);
    if (currentUser) {
      // then we close request and add auth header
      request = request.clone({
        setHeaders: {
          // Bearer is the type of token used in OAuth2
          // ! don't forget the space between Bearer and the token
          Authorization: `Bearer ${currentUser.token}`

        }
      });
    }
    return next.handle(request);
  }
}
