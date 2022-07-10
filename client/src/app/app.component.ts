import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Rider Finder';
  users: any; 

  constructor(private accountservice: AccountService) { }
    ngOnInit() {
     this.setCurrentUser();
    }

    // check local storage for user
    setCurrentUser(){
        const user: User = JSON.parse(localStorage.getItem('user'));
        this.accountservice.setCurrentUser(user);
    }

  
}
