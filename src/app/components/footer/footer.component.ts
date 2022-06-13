import { Component, OnInit } from '@angular/core';
import { AppComponent} from "../../app.component";
import { SessionData} from "../../ts/session-data";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  logged_in = SessionData.isLoggedIn();

  constructor() { }

  ngOnInit(): void {
  }

}
