import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rider } from 'src/app/_models/rider';

@Component({
  selector: 'app-rider-card',
  templateUrl: './rider-card.component.html',
  styleUrls: ['./rider-card.component.css']
})
export class RiderCardComponent implements OnInit {
  @Input() rider: Rider;
  
 

  constructor() { }

  ngOnInit(): void {
    
  }

  testClickHandler(){
    console.log("testClickHandler");
    console.log(this.rider);
  }
}
