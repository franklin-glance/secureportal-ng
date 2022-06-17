import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AccountService} from "../../services/account.service";
import {Config} from "../../models/config";


@Component({
  selector: 'app-newportal',
  templateUrl: './newportal.component.html',
  styleUrls: ['./newportal.component.css']
})
export class NewportalComponent implements OnInit {



  data: any;

  key: string = "";
  constructor(private http: HttpClient,
              private accountService: AccountService) { }

  ngOnInit(): void {
  }

  generateSecretKey(length: number): string {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result.trim();
  }

  generateKey() {
    this.key = this.generateSecretKey(12);
    // if logged in, save key to user
    console.log(this.key);
    this.accountService.addSecretKey(this.key);
    if (this.accountService.getLoggedIn()){
      this.accountService.setSecretKey(this.accountService.getUsername(), this.key);
    } else {
      localStorage.setItem('secretKey', this.key);
    }
  }

  copyKey() {

  }

  keyValue(): any{
    return this.accountService.getSecretKey();
  }

}
