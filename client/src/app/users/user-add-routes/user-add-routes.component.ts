import { Component, OnInit } from '@angular/core';
import { Rider } from 'src/app/_models/rider';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { RidersService } from 'src/app/_services/riders.service';
import { take } from 'rxjs';
import { RiderRoutes } from 'src/app/_models/riderroutes';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-add-routes',
  templateUrl: './user-add-routes.component.html',
  styleUrls: ['./user-add-routes.component.css']
})
export class UserAddRoutesComponent implements OnInit {
  rider: Rider;
  currentUser: User;
  routes: RiderRoutes[];
  selectedRoute: number;
  routeId: string;
  routeName: string;
  addedRoute: RiderRoutes


  constructor(private riderService: RidersService, private accountService: AccountService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      console.log(user);
      this.currentUser = user;
    });

    this.getLoggedRider();
  }

  getLoggedRider(){
    this.riderService.getRiderHandler(this.currentUser.userName).subscribe(rider =>
      {
        this.rider = rider;
        this.routes = rider.routes;
        console.log(this.rider);
      });
  }

  currentSelection(event){
    this.selectedRoute = event.target.value;
    console.log(this.selectedRoute);
  }

  addRoutes(event){
   console.log(this.routeId);
   console.log(this.routeName);
   this.addedRoute = {
      name: this.routeName,
      url: this.routeId,
   }
   this.riderService.addRouteHandler(this.addedRoute).subscribe(() => {
    this.toastrService.success("Route Deleted");
      this.getLoggedRider();
    });
  }

  deleteRoutes(){
    this.riderService.deleteRouteHanlder(this.selectedRoute).subscribe(() => {
      this.rider.routes = this.rider.routes.filter(route => route.id !== this.selectedRoute);
      this.toastrService.success("Route Deleted");
      this.getLoggedRider();
    })
  }
}
