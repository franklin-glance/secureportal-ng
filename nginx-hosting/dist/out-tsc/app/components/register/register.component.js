import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from "@angular/forms";
let RegisterComponent = class RegisterComponent {
    constructor(fb, http, route, router, accountService) {
        this.fb = fb;
        this.http = http;
        this.route = route;
        this.router = router;
        this.accountService = accountService;
        this.loading = false;
        this.submitted = false;
    }
    onSubmit() {
        // console.log(this.registerForm.getRawValue());
        let successful = false;
        // check if passwords match
        // @ts-ignore
        if (this.registerForm.get('password').value != this.registerForm.get('confirmPassword').value) {
            // passwords do not match
            console.log("passwords do not match");
            return;
        }
        // console.log(this.http.post('localhost:80/php/secureportal/includes/signup.inc.php', this.registerForm.getRawValue()));
    }
    ngOnInit() {
        this.registerForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            email: [''],
            rememberMe: [false]
        });
    }
};
RegisterComponent = __decorate([
    Component({
        selector: 'app-register',
        templateUrl: './register.component.html',
        styleUrls: ['./register.component.css']
    })
], RegisterComponent);
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map