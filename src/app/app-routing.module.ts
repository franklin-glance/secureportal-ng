import { NgModule } from '@angular/core';
import {RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {HomepageComponent} from "./components/homepage/homepage.component";
import {AboutComponent} from "./components/about/about.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {FeaturesComponent} from "./components/features/features.component";
import {PortalComponent} from "./components/portal/portal.component";
import {FaqComponent} from "./components/faq/faq.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {SettingsComponent} from "./components/profile/settings/settings.component";
import {Title} from "@angular/platform-browser";




const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    title: 'Home'
  },
  {
    path: 'homepage',
    component: HomepageComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'features',
    component: FeaturesComponent
  },
  {
    path: 'portal',
    component: PortalComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'newportal',
    component: PortalComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      {
        path: 'settings',
        component: SettingsComponent
      }
    ],
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
