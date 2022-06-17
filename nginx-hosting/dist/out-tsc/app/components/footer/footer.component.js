import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { SessionData } from "../../ts/session-data";
let FooterComponent = class FooterComponent {
    constructor() {
        this.logged_in = SessionData.isLoggedIn();
    }
    ngOnInit() {
    }
};
FooterComponent = __decorate([
    Component({
        selector: 'app-footer',
        templateUrl: './footer.component.html',
        styleUrls: ['./footer.component.css']
    })
], FooterComponent);
export { FooterComponent };
//# sourceMappingURL=footer.component.js.map