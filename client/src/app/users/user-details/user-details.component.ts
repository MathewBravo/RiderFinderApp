import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Rider } from 'src/app/_models/rider';
import { RidersService } from 'src/app/_services/riders.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  rider: Rider;
  ageString: string;

  constructor(private riderService: RidersService, private activatedRoute: ActivatedRoute){ }

  ngOnInit(): void {
    this.getRider();
    console.log(this.rider);
    //ageString = this.rider.age.toString();
  }


  getRider(){
    this.riderService.getRiderHandler(this.activatedRoute.snapshot.paramMap.get('username')).subscribe(rider => this.rider = rider);
  }
}
