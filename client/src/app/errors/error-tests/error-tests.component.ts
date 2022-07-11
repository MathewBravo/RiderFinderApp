import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-tests',
  templateUrl: './error-tests.component.html',
  styleUrls: ['./error-tests.component.css']
})
export class ErrorTestsComponent implements OnInit {
  url = 'https://localhost:5001/api/';
  validationErrors:string[] = [];
  constructor(private http: HttpClient) { 

  }

  ngOnInit(): void {
  }

  handle404Error(){
    this.http.get(this.url + '404').subscribe(
      data => {
        console.log(data);
      }, err => {
        console.log(err);
      }
    );
  }

  handle400Error(){
    this.http.get(this.url + 'exception/bad-request').subscribe(
      data => {
        console.log(data);
      }, err => {
        console.log(err);
      }
    );
  }

  handle500Error(){
    this.http.get(this.url + 'exception/server-error').subscribe(
      data => {
        console.log(data);
      }, err => {
        console.log(err);
      }
    );
  }

  handle401Error(){
    this.http.get(this.url + 'exception/auth').subscribe(
      data => {
        console.log(data);
      }, err => {
        console.log(err);
      }
    );
  }

  handle400ValidationError(){
    this.http.post(this.url + 'account/register', {}).subscribe(
      data => {
        console.log(data);
      }, err => {
        console.log(err);
        this.validationErrors = err;
      }
    );
  }

}
