import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() registerCancelHandler = new EventEmitter();
  model: any = {};

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  registerHandler(){

    this.accountService.registerHandler(this.model).subscribe((response) => {  
      console.log(response);
      this.cancelHandler();
    }, (error) => {
      console.log(error);
    }
    )};

  cancelHandler(){
    this.registerCancelHandler.emit(false);
  }
}
