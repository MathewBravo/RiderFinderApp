import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserListComponent} from './users/user-list/user-list.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'members', component: UserListComponent},
  {path: 'members/:id', component: UserDetailsComponent},
  {path: 'lists', component: ListsComponent},
  {path:'messages', component: MessagesComponent},
  {path: '**', pathMatch: 'full',component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
