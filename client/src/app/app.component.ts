import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Rider Finder';
  users: any; 

  constructor(private http: HttpClient) { }
    ngOnInit() {
     this.getUsers();
    }

    getUsers() {
      this.http.get('https://localhost:5001/api/users').subscribe(data => {
        this.users = data;
      }, err => {console.log(err)});
    }

  
}
