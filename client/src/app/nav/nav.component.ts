import { Component, OnInit, TemplateRef } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  modalRef?: BsModalRef;
  model: any = {};
;

  constructor(public accountService: AccountService, private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }
  closeModal(modalId?: number){
    this.modalService.hide(modalId);
  }

  loginHandler() {
    console.log(this.model);
    this.accountService.loginHandler(this.model).subscribe(data => {
      console.log(data);
     
    }, err => {
      console.log(err);
    })
  }

  logoutHandler(){
    this.accountService.logoutHandler();
   
  }

}
