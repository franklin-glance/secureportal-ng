import {Component, OnInit, Type} from '@angular/core';

import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";
import { ConfirmdeleteComponent} from "./settings/confirmdelete/confirmdelete.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


const MODALS: {[name: string]: Type<any>} = {
  confirmDelete: ConfirmdeleteComponent,
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private accountService: AccountService,
              private router: Router,
              private _modalService: NgbModal) { }

  ngOnInit(): void {
    console.log(this.accountService.getUsername());
    if(this.accountService.getUsername() == "Anonymous"){
      this.router.navigate(['/']);
    }
  }

  getUsername() {
    return this.accountService.getUsername();
  }


  getEmail() {
    return this.accountService.getEmail();
  }

  getSecretKey() {
    return this.accountService.getSecretKey();
  }


  open(name: string) {
    this._modalService.open(MODALS[name]);

  }
}
