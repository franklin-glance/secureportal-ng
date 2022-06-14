import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, ControlValueAccessor} from "@angular/forms";
import { Validators} from "@angular/forms";
import { FormBuilder} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import { HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";

import {User} from "../../models/user";
import {AccountService} from "../../services/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs";
import {Config} from "../../models/config";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // @ts-ignore
  loginForm: FormGroup;
  submitted=false;
  loading=false;
  // @ts-ignore
  user: User;


  constructor(private readonly fb: FormBuilder, private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              private accountService: AccountService) { }

  ngOnInit(){
    this.loginForm= this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required ],
      rememberMe: [false]
    });
  }


  onSubmit() {
    this.submitted=true;

    if (this.loginForm.invalid){
      return;
    }



    this.loading=true;
    this.accountService.login(this.user.username, this.user.password)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url -> default to homepage
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          // TODO: handle error
          this.loading=false;
        }
      })

    // console.log(this.loginForm.getRawValue());
    // TODO: change to url for server
    console.log(this.http.post('${}/secureportal/includes/login.inc.php', this.loginForm.getRawValue()));
  }
}
