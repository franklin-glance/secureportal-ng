import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {Observable} from "rxjs";
import { Router} from "@angular/router";


import { Config } from '../models/config'
import {User} from "../models/user";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
 constructor(private http: HttpClient,
             private router: Router) { }

  logged_in: boolean = false;

  // login user
  login(data: any): Observable<any> {
    return this.http.post<any>(`${Config.phpUrl}/includes/login.inc.php`, data);
  }

  setLoggedIn(loggedIn: boolean){
    this.logged_in = loggedIn;
  }

  getLoggedIn(){
    let user = localStorage.getItem('user');
    return !!user;
  }

  // logout user
  logout(){
    // delete user from local storage
    console.log("logout");
    localStorage.removeItem('user' );
    this.logged_in = false;
  }

  // register new user
  register(data: any): Observable<any>{
    return this.http.post<any>(`${Config.phpUrl}/includes/signup.inc.php`, data);
  }

  // get user information
  getUser(): Observable<any> {
    return this.http.get(`${Config.phpUrl}/includes/getuser.inc.php`).pipe(
      map((data: any) => {
        return data['data'];
      }
    ));
  }

  // update user information
  update(user: User){
    return this.http.put(`${Config.phpUrl}/includes/updateaccount.inc.php`, user);
  }

  // remove user account
  delete(){
    let username = localStorage.getItem('user');
    // delete user from local storage
    sessionStorage.removeItem('user');

    return this.http.post(`${Config.phpUrl}/includes/deleteaccount.inc.php`, {username});
  }

  getUsername() {
    if(this.getLoggedIn()) {
      return localStorage.getItem('user');
    } else {
      return "Guest";
    }
  }

  getSenderKey() {
    // generate key if one does not already exist
    let senderKey = localStorage.getItem('senderKey');
    if(!senderKey) {
      senderKey = AccountService.generateSenderKey();
      localStorage.setItem('senderKey', senderKey);
    }
    return senderKey;
  }

  private static generateSenderKey() {
    return "12345";
  }

  setSecretKey(username: any, secret_key: string): any {
    if (this.getLoggedIn()) {
      var data = new FormData();
      data.append("username", username);
      data.append("secret_key", secret_key);
      var xhr = new XMLHttpRequest();
      xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
          console.log(this.responseText);
        }
      });
      xhr.open("POST", `${Config.phpUrl}/includes/setsecretkey.inc.php`);
      xhr.send(data);
    }
    localStorage.setItem('secretKey', secret_key);
  }

  getSecretKey() {
    return localStorage.getItem('secretKey');
}

  deleteSecretKey() {
    localStorage.removeItem('secretKey');
  }

  getEmail() {
    return localStorage.getItem('email');
  }

  validateKey(secret_key_form: any) {
    return this.http.post(`${Config.phpUrl}/includes/validatekey.inc.php`, {secret_key: secret_key_form});
  }
}
