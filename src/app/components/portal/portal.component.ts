import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  logged_in: boolean = false;
  username: string = "Guest";


  constructor(private accountService: AccountService,
              private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if(event.constructor.name === "NavigationEnd"){
        this.logged_in = this.accountService.getLoggedIn();
      }
    })
  }







  getName() {
    return this.accountService.getUsername();
  }

  isLoggedIn() {
    return this.accountService.getLoggedIn();
  }

  deleteKey() {
  }

}
