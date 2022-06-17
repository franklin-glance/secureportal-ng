import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from "./components/homepage/homepage.component";
import { AboutComponent } from "./components/about/about.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { FeaturesComponent } from "./components/features/features.component";
import { PortalComponent } from "./components/portal/portal.component";
import { FaqComponent } from "./components/faq/faq.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { SettingsComponent } from "./components/profile/settings/settings.component";
const routes = [
    {
        path: '',
        component: HomepageComponent,
        title: 'SecurePortal | Home'
    },
    {
        path: 'homepage',
        component: HomepageComponent,
        title: 'SecurePortal | Home'
    },
    {
        path: 'about',
        component: AboutComponent,
        title: 'SecurePortal | About'
    },
    {
        path: 'features',
        component: FeaturesComponent,
        title: 'SecurePortal | Features'
    },
    {
        path: 'portal',
        component: PortalComponent,
        title: 'SecurePortal | Portal'
    },
    {
        path: 'faq',
        component: FaqComponent,
        title: 'SecurePortal | FAQ'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'SecurePortal | Login'
    },
    {
        path: 'register',
        component: RegisterComponent,
        title: 'SecurePortal | Register'
    },
    {
        path: 'newportal',
        component: PortalComponent,
        title: 'SecurePortal | New Portal'
    },
    {
        path: 'profile',
        component: ProfileComponent,
        title: 'SecurePortal | Profile',
        children: [
            {
                path: 'settings',
                component: SettingsComponent,
                title: 'SecurePortal | Profile | Settings'
            }
        ],
    },
    {
        path: '**',
        component: NotFoundComponent,
        title: 'SecurePortal | 404 Not Found'
    },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule],
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map