import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent} from "../../app.component";
import { SessionData} from "../../ts/session-data";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logged_in = SessionData.isLoggedIn();
  title = "navbar";

  getTitle(){
    return this.title;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
