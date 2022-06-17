import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";


import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loading = false;
  errorMessage: string = "";
  invalidForm: boolean = false;

  submitted=false;
  responsedata: any;
  username_error_message: boolean = false;
  password_error_message: boolean = false;
  email_error_message: boolean = false;

  constructor(private readonly fb: FormBuilder,
              private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              private accountService: AccountService) { }

  registerFormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmpassword: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    remember_me: new FormControl(false)
  });

  onSubmit(): void {
    this.username_error_message = false;
    this.password_error_message = false;
    this.email_error_message = false;
    this.invalidForm = false;
    this.loading = true;
    this.errorMessage = "";
    this.submitted = true;
    this.responsedata = "";
    let formData = JSON.stringify(this.registerFormGroup.value);
    this.accountService.register(formData).subscribe(
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
        if (this.responsedata['success']){
          this.accountService.setLoggedIn(true);
          localStorage.setItem("user", this.responsedata["username"]);
          localStorage.setItem("loggedIn", "true");

          this.accountService.setUser(this.responsedata['User']);

          this.router.navigate(['/']);
        } else {
          this.invalidForm = true;
          console.log(this.responsedata["message"]);
          this.errorMessage = this.responsedata["message"];
          switch (this.responsedata['errorLocation']){
            case "username":
              this.username_error_message = true;
              break;
            case "password":
              this.password_error_message = true;
              break;
            case "email":
              this.email_error_message = true;
              break;
            default:
              break;
          }

        }
      }
    );



  }

  ngOnInit() {

  }


}

