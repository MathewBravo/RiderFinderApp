import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  @ViewChild("editForm") editForm: NgForm;
  
  rider: Rider;
  currentUser: User;

  constructor(private accountService: AccountService, private riderService: RidersService, private toastrService: ToastrService) {
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
        this.rider = rider;
      });
  }

  updateRider(){
    console.log(this.rider);
    this.riderService.updateRiderHandler(this.rider).subscribe(() => {
      this.toastrService.success("Update Successful");
      this.editForm.reset(this.rider);
    });
  }
}

