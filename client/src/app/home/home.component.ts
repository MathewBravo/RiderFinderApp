import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { User } from '../_models/user';
import { take } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  registerMode = false;
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.getRider();
    console.log('test');
  }
  registerModeHandler(){
    this.registerMode = true;

  }

  cancelRegisterModeHandler(event: boolean){
    this.registerMode = event;
  }

  getRider(){
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      console.log(user);
      this.currentUser = user;
    });
  }
}
