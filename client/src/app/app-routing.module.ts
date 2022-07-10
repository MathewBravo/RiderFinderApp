import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserListComponent} from './users/user-list/user-list.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_gaurds/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '', runGuardsAndResolvers: 'always', canActivate: [AuthGuard], children: [
      {path: 'members', component: UserListComponent, canActivate: [AuthGuard]},
      {path: 'members/:id', component: UserDetailsComponent},
      {path: 'lists', component: ListsComponent},
      {path:'messages', component: MessagesComponent},
    ]
  },
  {path: '**', pathMatch: 'full',component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
