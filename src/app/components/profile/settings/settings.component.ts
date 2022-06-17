import { Component, OnInit } from '@angular/core';
import { ViewChild} from '@angular/core';
import {AccountService} from "../../../services/account.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor( private accountService: AccountService,
               private  router: Router) { }

  ngOnInit(): void {
    if(this.accountService.getUsername() == "Anonymous"){
      this.router.navigate(['/']);
    }
  }

}
