import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/_models/paginations';
import { Rider } from 'src/app/_models/rider';
import { User } from 'src/app/_models/user';
import { RidersService } from 'src/app/_services/riders.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  riders: Rider[];
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 6;

  constructor(private riderService: RidersService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.riderService.getRidersHandler(this.pageNumber, this.pageSize).subscribe(
      (res) => {
        console.log(res);
        this.riders = res.result;
        this.pagination = res.pagination;
      }
    );
  }

  pageChanged(event: any): void {
    console.log(event)
    this.pageNumber = event.page;
    this.loadUsers();
  }
}
