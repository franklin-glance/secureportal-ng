import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, ControlValueAccessor} from "@angular/forms";
import { Validators} from "@angular/forms";
import { FormBuilder} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import { HttpClient,  HttpParams} from "@angular/common/http";
import { SessionData} from "../../ts/session-data";


import {User} from "../../models/user";
import {AccountService} from "../../services/account.service";


import {ActivatedRoute, Router} from "@angular/router";

import {Config} from "../../models/config";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  loading = false;
  errorMessage: string = "";
  invalidForm: boolean = false;

  username_error_message: string = "";
  password_error_message: boolean = false;

  submitted=false;



  constructor(private readonly fb: FormBuilder, private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              private accountService: AccountService
  ) {
  }

  responsedata: any;

  loginFormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    remember_me: new FormControl(false)
  });

  onSubmit(): void {
    this.invalidForm = false;
    this.loading = true;
    this.errorMessage = "";
    this.submitted = true;
    let formData = JSON.stringify(this.loginFormGroup.value);
    this.accountService.login(formData).subscribe(
      data => {
        console.log(data);
        this.responsedata = data;
      },
      error => {
        console.log(error);
        this.loading = false;
      },
      () => {
        this.loading = false;
        if (this.responsedata["success"]){
          this.accountService.setLoggedIn(true);
          console.log("welcome: " + this.responsedata["username"]);
          localStorage.setItem("user", this.responsedata["username"]);
          localStorage.setItem("loggedIn", "true");
          this.router.navigate(['/']);
        } else {
          this.invalidForm = true;
          console.log(this.responsedata["message"]);
          this.errorMessage = this.responsedata["message"];
          this.password_error_message = this.responsedata["errorLocation"] == "password";
        }
      }
    );
  }



  ngOnInit(): void {

  }

}
