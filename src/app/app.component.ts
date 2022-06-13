import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { Title} from "@angular/platform-browser";

import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) {
  }

  signed_in: boolean = false;

  getLoginStatus(){
    return this.signed_in;
  }

  title = 'secureportal-ng';

}
