import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserListComponent} from './users/user-list/user-list.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_gaurds/auth.guard';
import { ErrorTestsComponent } from './errors/error-tests/error-tests.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorsComponent } from './errors/server-errors/server-errors.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '', runGuardsAndResolvers: 'always', canActivate: [AuthGuard], children: [
      {path: 'riders', component: UserListComponent, canActivate: [AuthGuard]},
      {path: 'rider/:username', component: UserDetailsComponent},
      {path: 'lists', component: ListsComponent},
      {path:'messages', component: MessagesComponent},
    ]
  },
  {path: 'errors', component: ErrorTestsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorsComponent},
  {path: '**', pathMatch: 'full',component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
