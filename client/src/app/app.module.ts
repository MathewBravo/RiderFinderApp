import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorTestsComponent } from './errors/error-tests/error-tests.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorsComponent } from './errors/server-errors/server-errors.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { RiderCardComponent } from './users/rider-card/rider-card.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserEditProfileComponent } from './users/user-edit-profile/user-edit-profile.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { UserAddRoutesComponent } from './users/user-add-routes/user-add-routes.component';
import { TextInputFormsComponent } from './_forms/text-input-forms/text-input-forms.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DateInputFormsComponent } from './_forms/date-input-forms/date-input-forms.component';

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
    UserEditProfileComponent,
    UserAddRoutesComponent,
    TextInputFormsComponent,
    DateInputFormsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
