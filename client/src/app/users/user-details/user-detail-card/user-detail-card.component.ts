import { Component, Input, OnInit } from '@angular/core';
import { Rider } from 'src/app/_models/rider';
import { RiderRoutes } from 'src/app/_models/riderroutes';

@Component({
  selector: 'app-user-detail-card',
  templateUrl: './user-detail-card.component.html',
  styleUrls: ['./user-detail-card.component.css']
})
export class UserDetailCardComponent implements OnInit {
  @Input() route: RiderRoutes;
  
  constructor() { }

  ngOnInit(): void {
  }

}
