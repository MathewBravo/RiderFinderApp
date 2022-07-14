import { Component, OnInit } from '@angular/core';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  url: SafeResourceUrl;
  riderArray = [
    {
      id: 1,
      routeId: '66705360',
    },
    {
      id: 2,
      routeId: '66705551',
    }
  ]
  radioId  = '66707637';
  iframeSrc = "https://ridewithgps.com/embeds?type=trip&id=66707637&metricUnits=true&sampleGraph=true";
  iframeSrcPrefix = "https://ridewithgps.com/embeds?type=trip&id=";
  iframeSrcSuffix = "&metricUnits=true&sampleGraph=true";
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeSrc);
  }

  onChangeHandler(event){
    console.log(event.target.value);
    this.iframeSrc = this.iframeSrcPrefix + event.target.value + this.iframeSrcSuffix;
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeSrc);
  }
}
