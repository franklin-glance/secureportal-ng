import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-call-to-action',
  templateUrl: './call-to-action.component.html',
  styleUrls: ['./call-to-action.component.css']
})
export class CallToActionComponent implements OnInit {
  secret_key_error: boolean = false;
  connected: boolean = false;

  constructor(private accountService: AccountService,
              private router: Router) { }

  ngOnInit(): void {
  }

  // on click of secret_key_portal_btn button
  secret_key_form: any;

  secretKeyPortalBtnClick() {
    console.log("secretKeyPortalBtnClick");

  }

  connectViaKey() {
    // check if the key is valid
    // if valid, connect to the portal
    this.secret_key_error = false;

    this.accountService.checkKey(this.secret_key_form).subscribe(
      (data)=>
      {
        if (data == 0){
          // key is valid
          this.connected = true;
          localStorage.setItem('secretKey', this.secret_key_form);
          if (this.accountService.getLoggedIn()) {
            this.accountService.setSecretKey(this.accountService.getUsername(), this.secret_key_form);
          }
          this.router.navigate(['/portal']);
          return;
        } else if (data == 1){
          this.connected = false;
          this.secret_key_error=true;
          return;
        }
      }
    );
  }
}
