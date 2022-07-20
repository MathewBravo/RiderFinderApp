import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/_models/paginations';
import { Rider } from 'src/app/_models/rider';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { RidersService } from 'src/app/_services/riders.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  riders: Rider[];
  pagination: Pagination;
  userParams: UserParams;;

  constructor(private riderService: RidersService, private accountService: AccountService) {
    this.userParams = new UserParams();
   }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.riderService.getRidersHandler(this.userParams).subscribe(
      (res) => {
        console.log(res);
        this.riders = res.result;
        this.pagination = res.pagination;
      }
    );
  }

  resetFilters(){
    this.userParams = new UserParams()
    this.loadUsers();
  }

  pageChanged(event: any): void {
    console.log(event)
    this.userParams.pageNumber = event.page;
    this.loadUsers();
  }
}
