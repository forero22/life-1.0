/**
 * Ionic Capacitor Full App in Angular  (https://store.enappd.com/product/capacitor-full-app-with-ionic-angular)

 *
 * Copyright © 2020-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Component({
  selector: 'google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss'],
})
export class GoogleLoginComponent implements OnInit {

  @Output() accessToken = new EventEmitter<{ idToken?: string; accessToken?: string; isBrowser?: boolean }>();

  constructor(private platform: Platform) { }

  ngOnInit() { }

  async doLogin() {
    if (this.platform.is('capacitor')) {
      console.info('Signin-Google')
      const user = await GoogleAuth.signIn();
      if (user) {
        console.log(user);
        alert(user);
        const idToken = user.authentication.idToken;
        const accessToken = user.authentication.accessToken;
        this.accessToken.next({ idToken, accessToken });
      }
    } else {
      GoogleAuth.init();
      console.info('Auth-Google')
      this.accessToken.next({ isBrowser: true });
    }
  }

  /** *********** GETTING USER PROFILE INFO *********** */
  // User info is returned in this format
  // {"authentication": {
  //   "accessToken": "xxxxxxxxxx",
  //   "idToken": "xxxxxxxxxxxx"},
  //   "email": "abhijxxxxxxx@gmail.com",
  //   "familyName": "Rathore",
  //   "givenName": "Abhijeet",
  //   "id": "104xxxxxxxxx2852",
  //   "imageUrl": "https://lh3.googleusercontent.com/a-/AAuE7XXXXXXXXXXXXEq-pnteIcLe-XGib4kn7eZsQ=s96-c",
  //   "name": "Abhijeet Rathore",
  //   "serverAuthCode": "XXXXXXXX"
  //   }
  // For details ,check this tutorial - https://enappd.com/blog/google-login-in-ionic-react-capacitor-apps/122/

  /** *********** END *********** */


  // If you are using Google auth separate from Firebase, use this function to Logout
  // If you are using Google auth along with Firebase,there is no need to logout from Google everytime
  // Signout in your app can be taken care of by Firebase, while user always stays logged in via Google

  /* async signOutFromGoogle(): Promise<void> {
    await Plugins.GoogleAuth.signOut();
    // --> go back to login page or anywhere you want to redirect
  } */
}

