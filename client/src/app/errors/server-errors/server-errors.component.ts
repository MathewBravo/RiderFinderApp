import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-errors',
  templateUrl: './server-errors.component.html',
  styleUrls: ['./server-errors.component.css']
})
export class ServerErrorsComponent implements OnInit {
  error: any;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.error = nav?.extras?.state?.error;
   }

  ngOnInit(): void {
  }

}
