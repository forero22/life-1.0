import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

// import { FacebookLoginComponent } from '../../components/facebook-login/facebook-login.component';
import { GoogleLoginComponent } from '../../components/google-login/google-login.component';
// import { TwitterLoginComponent } from '../../components/twitter-login/twitter-login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
  ],
  declarations: [LoginPage],
  exports: []
})
export class LoginPageModule { }
