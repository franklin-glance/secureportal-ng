import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {CookieService} from 'ngx-cookie-servcie'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;


  constructor(private readonly fb: FormBuilder, private http: HttpClient) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      email: ['']
    });
  }
  onSubmit() {
    // console.log(this.registerForm.getRawValue());
    let successful: boolean = false;

    console.log(this.http.post('localhost:80/php/secureportal/includes/signup.inc.php', this.registerForm.getRawValue()));
    if (successful){
      this.cookieService.set('username', this.registerForm.getRawValue().username);
    }
  }

  ngOnInit(): void {
  }

}
