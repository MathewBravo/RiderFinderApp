import { Component, OnInit } from '@angular/core';
import { Rider } from 'src/app/_models/rider';
import { RidersService } from 'src/app/_services/riders.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: Rider[];

  constructor(private riderService: RidersService) { }

  ngOnInit(): void {
    this.loadRiders();
  }

  loadRiders(){
    this.riderService.getRidersHandler().subscribe(riders => {
      this.users = riders;
    });
  }

}
