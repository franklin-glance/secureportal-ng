import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, ControlValueAccessor} from "@angular/forms";
import { Validators} from "@angular/forms";
import { FormBuilder} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import { HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  constructor(private readonly fb: FormBuilder, private http: HttpClient) {
    this.loginForm= this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required ]
    });
  }

  onSubmit() {
    // console.log(this.loginForm.getRawValue());
    // TODO: change to url for server
    console.log(this.http.post('localhost:80/php/secureportal/includes/login.inc.php', this.loginForm.getRawValue()));
  }
}
