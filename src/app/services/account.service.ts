import {Component, Injectable, OnInit} from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {Observable} from "rxjs";
import { Router} from "@angular/router";


import { Config } from '../models/config'
import {User} from "../models/user";
import {map} from "rxjs/operators";

export interface Response {
  status: number;
  message: string;
}


@Injectable({
  providedIn: 'root'
})
export class AccountService implements OnInit{

  generateRandNum(length: number): string {
    const characters ='0123456789';
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result.trim();
  }

  ngOnInit() {

  }


  user: User = { username: 'Anonymous', friends: []};
  user_default: User = { username: 'Anonymous', friends: []};

 constructor(private http: HttpClient,
             private router: Router) {
 }

logged_in: boolean = false;
_connected: boolean = false;

set connected(val: boolean){
  this._connected = val;
}

get connected(): boolean{
  return this._connected;
}

 setUser(data: any){
   this.user = JSON.parse(data);
 }

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
    localStorage.clear();
    this.connected = false;
    this.user = this.user_default;
    this.logged_in = false;
    this.router.navigate(['/']);
  }

  // register new user
  register(data: any): Observable<any>{
    // this should just be successful
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
    return this.http.put(`${Config.phpUrl}/includes/updateuser.inc.php`, JSON.stringify(user));
  }

  // remove user account
  delete(){
    let username = localStorage.getItem('user');

    this.logout();
    this.http.get(`${Config.phpUrl}/includes/deleteaccount.inc.php?username=${username}`).subscribe(
      (data: any) => {
        console.log(data);
      } ,
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  getUsername() {
    return this.user.username;
  }

  getSenderKey() {
    // generate key if one does not already exist
    let senderKey = localStorage.getItem('senderKey');
    if(!senderKey) {
      senderKey = AccountService.generateSenderKey();
      localStorage.setItem('senderKey', senderKey.trim());
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
  // TODO: delete key from key registry
    localStorage.removeItem('secretKey');
  }

  getEmail() {
    return localStorage.getItem('email');
  }

  validateKey(secret_key_form: any) {
    return this.http.post(`${Config.phpUrl}/includes/validatekey.inc.php`, {secret_key: secret_key_form});
  }


  getFriends(){
    return this.user.friends;
  }

  addFriend(friend: User){
    this.user.friends.push(friend);
    // TODO: update user on database
  }

  removeFriend(friend: User): string{
    // TODO: update user on database
    var i;
    let found: boolean = false;
    let temp: Array<User> = [];
    for (i = 0; i < this.user.friends.length; i++) {
      if (this.user.friends[i] === friend) {
        found = true;
      } else {
        temp.push(this.user.friends[i]);
      }
    }
    if (found){
      this.user.friends = temp;
      return 'friend removed successfully';
    }else {
      return 'friend not found in users friend list';
    }
  }

  addSecretKey(key: string): any {
    this.http.get(`${Config.phpUrl}/includes/newkey.inc.php?secret_key=${key}`).subscribe(
      (data: any) => {
        console.log(data);
      } ,
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  checkKeyRegistry(key: string): any{
  let r: number;
  this.http.get<any>(`${Config.phpUrl}/includes/checkKeyRegistry.inc.php?secret_key=${key}`)
    .subscribe({
      next: (data: any) => {
        return r==0;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
        return r == 0;
      }});
  }



  addKey(secret_key_form: any) {
   // adds key to local storage registry of keys
    // json encoding of array
    let keyArray = [secret_key_form];
    if (localStorage.getItem('user_keys') != null){
      // @ts-ignore
      keyArray = JSON.parse(localStorage.getItem('user_keys'));
      keyArray.push(secret_key_form);
    }
    localStorage.setItem('user_keys', JSON.stringify(keyArray));
  }

  checkKey(key: string){
    return this.http.get<any>(`${Config.phpUrl}/includes/checkKeyRegistry.inc.php?secret_key=${key}`);
  }


getConnectionStatus(): any{
  // update user info
  this.http.get<any>(`${Config.phpUrl}/includes/getuser.inc.php?username=${localStorage.getItem('user')}`)
    .subscribe({
      next: value => {
        if (value != null){
          this.user = (value);
        }
      },

      }
    )

  let key = this.getSecretKey();
   return this.http.get<any>(`${Config.phpUrl}/includes/checkKeyRegistry.inc.php?secret_key=${key}`);
  }


}
