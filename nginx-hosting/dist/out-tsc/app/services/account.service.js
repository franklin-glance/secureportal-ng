import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config } from '../models/config';
import { error } from "@angular/compiler-cli/src/transformers/util";
let AccountService = class AccountService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        if (localStorage.getItem('user') !== null) { // @ts-ignore
            this.userBehaviorSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')));
            this.userBehaviorSubject.subscribe();
        }
        else
            throw error("user not created");
        this.user = this.userBehaviorSubject.asObservable();
    }
    // login user
    login(username, password) {
        return this.http.post(`${Config.phpUrl}/includes/login.inc.php`, { username, password })
            .pipe(map(user => {
            // store user in local storage
            localStorage.setItem('user', JSON.stringify(user));
        }));
    }
    // logout user
    logout() {
        localStorage.removeItem('user');
        this.userBehaviorSubject.unsubscribe();
    }
    // register new user
    register() {
        return this.http.post(`${Config.phpUrl}/includes/signup.inc.php`, this.user);
    }
    // update user information
    update() {
    }
    // remove user account
    delete(username) {
        return this.http.post(`${Config.phpUrl}/includes/deleteaccount.inc.php`, { username });
    }
};
AccountService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AccountService);
export { AccountService };
//# sourceMappingURL=account.service.js.map