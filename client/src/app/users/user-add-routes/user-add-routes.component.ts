import { Component, OnInit } from '@angular/core';
import { Rider } from 'src/app/_models/rider';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { RidersService } from 'src/app/_services/riders.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-user-add-routes',
  templateUrl: './user-add-routes.component.html',
  styleUrls: ['./user-add-routes.component.css']
})
export class UserAddRoutesComponent implements OnInit {
  rider: Rider;
  currentUser: User;

  constructor(private riderService: RidersService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      console.log(user);
      this.currentUser = user;
    });

    this.getLoggedRider();
  }

  getLoggedRider(){
    this.riderService.getRiderHandler(this.currentUser.userName).subscribe(rider =>
      {
        this.rider = rider;
        console.log(this.rider);
      });
  }


}
