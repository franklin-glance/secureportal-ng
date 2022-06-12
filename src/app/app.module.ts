import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule} from "@angular/router";
import { FormsModule} from "@angular/forms";

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

@NgModule({
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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot([
      { path: 'about', component: AboutComponent },
      { path: 'register', component: RegisterComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
