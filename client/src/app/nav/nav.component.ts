import { Component, OnInit, TemplateRef } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  modalRef?: BsModalRef;
  model: any = {};
  userName = '';
;

  constructor(public accountService: AccountService, private modalService: BsModalService, private router: Router, private toastr: ToastrService){ }

  ngOnInit(): void {
   
  }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }
  closeModal(modalId?: number){
    this.modalService.hide(modalId);
  }

  loginHandler() {
    this.accountService.loginHandler(this.model).subscribe(data => {
      console.log(data);
      this.router.navigateByUrl('/riders');
    }, err => {
      console.log(err);
    })
  }

  logoutHandler(){
    this.accountService.logoutHandler();
    this.router.navigateByUrl('/');
    location.reload();
  }

}
