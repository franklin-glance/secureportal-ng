import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AboutComponent } from './components/about/about.component';
import { RegisterComponent } from './components/register/register.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FeaturesComponent } from './components/features/features.component';
import { PortalComponent } from './components/portal/portal.component';
import { FaqComponent } from './components/faq/faq.component';
import { NewportalComponent } from './components/portal/newportal/newportal.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/profile/settings/settings.component';
import { LoginComponent } from './components/login/login.component';
import { CallToActionComponent } from './components/call-to-action/call-to-action.component';
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
            AboutComponent,
            RegisterComponent,
            HomepageComponent,
            FooterComponent,
            NavbarComponent,
            NotFoundComponent,
            FeaturesComponent,
            PortalComponent,
            FaqComponent,
            NewportalComponent,
            ProfileComponent,
            SettingsComponent,
            LoginComponent,
            CallToActionComponent
        ],
        imports: [
            BrowserModule,
            AppRoutingModule,
            NgbModule,
            HttpClientModule,
            RouterModule.forRoot([
                { path: 'about', component: AboutComponent },
                { path: 'register', component: RegisterComponent },
            ]),
            FormsModule,
            ReactiveFormsModule,
        ],
        providers: [],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map