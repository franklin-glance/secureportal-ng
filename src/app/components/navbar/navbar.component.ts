import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent} from "../../app.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = "navbar";

  getTitle(){
    return this.title;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
