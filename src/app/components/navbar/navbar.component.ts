import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent} from "../../app.component";
import { SessionData} from "../../ts/session-data";
import { AccountService} from "../../services/account.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = "navbar";
  logged_in: boolean = false;

  getTitle(){
    return this.title;
  }

  constructor(private accountService: AccountService,
              private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if(event.constructor.name === "NavigationEnd"){
        this.logged_in = this.accountService.getLoggedIn();
      }
    })

  }


  logout(){
    this.accountService.logout();
  }

  isLoggedIn() {
    return this.accountService.getLoggedIn();
  }
}
