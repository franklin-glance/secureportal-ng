import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {Observable} from "rxjs";
import { Router} from "@angular/router";


import { Config } from '../models/config'

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


  // update user information
  update(){

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
}
