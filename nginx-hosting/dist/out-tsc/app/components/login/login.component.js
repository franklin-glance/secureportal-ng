import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from "@angular/forms";
import { first } from "rxjs";
let LoginComponent = class LoginComponent {
    constructor(fb, http, route, router, accountService) {
        this.fb = fb;
        this.http = http;
        this.route = route;
        this.router = router;
        this.accountService = accountService;
        this.submitted = false;
        this.loading = false;
    }
    ngOnInit() {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            rememberMe: [false]
        });
    }
    onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
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
                this.loading = false;
            }
        });
        // console.log(this.loginForm.getRawValue());
        // TODO: change to url for server
        console.log(this.http.post('${}/secureportal/includes/login.inc.php', this.loginForm.getRawValue()));
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map