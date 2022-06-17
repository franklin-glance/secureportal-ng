import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import {Config} from "../../models/config";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private router: Router,
              private http: HttpClient,
              private readonly fb: FormBuilder) { }

  ngOnInit(): void {
  }

  contactFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
  })

  onSubmit(): void {
    let formData = JSON.stringify(this.contactFormGroup.value);
    this.http.get(`${Config.phpUrl}/includes/contactform.inc.php?formdata=${formData}`);
    this.router.navigate(['/']);
  }

}
