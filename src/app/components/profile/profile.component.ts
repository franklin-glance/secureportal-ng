import { Component, OnInit } from '@angular/core';

import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private accountService: AccountService,
              private router: Router) { }

  ngOnInit(): void {
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

  deleteAccount() {

  }
}
