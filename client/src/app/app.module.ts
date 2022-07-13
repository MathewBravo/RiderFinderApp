import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { ToastrModule } from 'ngx-toastr';
import { ErrorTestsComponent } from './errors/error-tests/error-tests.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorsComponent } from './errors/server-errors/server-errors.component';
import { RiderCardComponent } from './users/rider-card/rider-card.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { UserDetailCardComponent } from './users/user-details/user-detail-card/user-detail-card.component';
import { UserEditProfileComponent } from './users/user-edit-profile/user-edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    UserListComponent,
    UserDetailsComponent,
    ListsComponent,
    MessagesComponent,
    ErrorTestsComponent,
    NotFoundComponent,
    ServerErrorsComponent,
    RiderCardComponent,
    UserDetailCardComponent,
    UserEditProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot(
      {
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      }
  
  
  
  
  
  
  
  
  
  
  
  
      ),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor , multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

