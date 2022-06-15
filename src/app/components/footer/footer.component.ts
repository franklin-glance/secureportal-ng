import { Component, OnInit } from '@angular/core';
import { AppComponent} from "../../app.component";
import { SessionData} from "../../ts/session-data";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  logged_in = SessionData.isLoggedIn();

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  isLoggedIn() {
    return this.accountService.getLoggedIn();
  }

  logout() {
    this.accountService.logout();
  }
}
