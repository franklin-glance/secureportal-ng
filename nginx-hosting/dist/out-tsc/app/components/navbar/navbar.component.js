import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { SessionData } from "../../ts/session-data";
let NavbarComponent = class NavbarComponent {
    constructor() {
        this.logged_in = SessionData.isLoggedIn();
        this.title = "navbar";
    }
    getTitle() {
        return this.title;
    }
    ngOnInit() {
    }
};
NavbarComponent = __decorate([
    Component({
        selector: 'app-navbar',
        templateUrl: './navbar.component.html',
        styleUrls: ['./navbar.component.css']
    })
], NavbarComponent);
export { NavbarComponent };
//# sourceMappingURL=navbar.component.js.map