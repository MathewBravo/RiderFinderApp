import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
  routeId: string;
  url: SafeResourceUrl;

  constructor(private riderService: RidersService, private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer){ }

  iframeSrc = "https://ridewithgps.com/embeds?type=trip&id=66707637&metricUnits=true&sampleGraph=true";
  iframeSrcPrefix = "https://ridewithgps.com/embeds?type=trip&id=";
  iframeSrcSuffix = "&metricUnits=true&sampleGraph=true";

  onChangeHandler(event){
    console.log(event.target.value);
    this.iframeSrc = this.iframeSrcPrefix + event.target.value + this.iframeSrcSuffix;
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeSrc);
  }

  ngOnInit(): void {
    this.getRider();
    console.log(this.rider)
  }

  onRouteChange(event){
    this.routeId = event;
    this.iframeSrc = this.iframeSrcPrefix + this.routeId + this.iframeSrcSuffix;
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeSrc);
  }

  getRider(){
    this.riderService.getRiderHandler(this.activatedRoute.snapshot.paramMap.get('username')).subscribe(rider => {
      this.rider = rider; 
      console.log(this.rider.routes[0].name);
      this.routeId = this.rider.routes[0].url;
      this.iframeSrc = this.iframeSrcPrefix + this.routeId + this.iframeSrcSuffix;
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeSrc);
    });
  }
}
