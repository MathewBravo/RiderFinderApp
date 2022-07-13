import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Rider } from 'src/app/_models/rider';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { RidersService } from 'src/app/_services/riders.service';

@Component({
  selector: 'app-user-edit-profile',
  templateUrl: './user-edit-profile.component.html',
  styleUrls: ['./user-edit-profile.component.css']
})
export class UserEditProfileComponent implements OnInit {
  rider: Rider;
  currentUser: User;

  constructor(private accountService: AccountService, private riderService: RidersService){
    //get user out of observable
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      console.log(user);
      this.currentUser = user;
    });
   }

  ngOnInit(): void {
    this.getLoggedRider();
  }

  getLoggedRider(){
    this.riderService.getRiderHandler(this.currentUser.userName).subscribe(rider =>
      {
        console.log(rider);
        console.log(this.currentUser.userName);
        this.rider = rider;
      });
  }

}
