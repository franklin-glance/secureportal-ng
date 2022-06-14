import { Injectable } from '@angular/core';
import { Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { Config } from '../models/config'
import { User } from '../models/user';
import {error} from "@angular/compiler-cli/src/transformers/util";



@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userBehaviorSubject: BehaviorSubject<User>;
  public user: Observable<User>;



  constructor(private router: Router,
              private http: HttpClient) {
    if (localStorage.getItem('user') !== null)
      { // @ts-ignore
        this.userBehaviorSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.userBehaviorSubject.subscribe();
      }
    else
      throw error("user not created");
    this.user = this.userBehaviorSubject.asObservable();
  }

  // login user
  login(username: any, password: any){
    return this.http.post<User>(`${Config.phpUrl}/includes/login.inc.php`, {username, password})
      .pipe(map(user=>{
        // store user in local storage
        localStorage.setItem('user', JSON.stringify(user));

      }))
  }

  // logout user
  logout(){
    localStorage.removeItem('user');
    this.userBehaviorSubject.unsubscribe();
  }

  // register new user
  register(){
    return this.http.post(`${Config.phpUrl}/includes/signup.inc.php`, this.user)
  }


  // update user information
  update(){

  }

  // remove user account
  delete(username: string){
    return this.http.post(`${Config.phpUrl}/includes/deleteaccount.inc.php`, {username});
  }

}
