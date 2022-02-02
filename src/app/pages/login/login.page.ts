import { Component, OnInit } from '@angular/core';
import { Platform, AlertController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { UtilService } from '../../services/util.service';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email: string;
  public password: string;

  constructor(
    private platform: Platform,
    private alertController: AlertController,
    public util: UtilService,
    private menuCtrl: MenuController,
    private authService: AuthenticationService
  ) {

    this.email = '';
    this.password = '';
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'start');
    this.menuCtrl.enable(false, 'end');
    this.platform.ready().then(() => {
      SplashScreen.hide();
    });
  }

  signin() {
    if (this.util.validateEmail(this.email) && this.password !== '') {
      this.util.openLoader();
      this.authService.login(this.email, this.password).then(userData => {
        this.util.navigate('home', false);
        this.email = '';
        this.password = '';
      }).catch(err => {
        if (err) {
          this.util.presentToast(`${err}`, true, 'bottom', 2100);
        }

      }).then(el => this.util.closeLoading());
    } else {
      this.util.presentToast('Ingrese correo electrónico y contraseña', true, 'bottom', 2100);
    }
  }

  async forgotPassword() {
    const alert = await this.alertController.create({
      header: 'Restablecer Correo',
      backdropDismiss: false,
      cssClass: 'darkModeAwareAlert',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Introduce tu correo electrónico',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (userResult) => {
            console.log('Cancel');
          }
        }, {
          text: 'Aceptar',
          handler: (userResult) => {
            const value = this.util.validateEmail(userResult.email);
            // this.authService.forgotPassword(userResult.email);
            return value;
          }
        }
      ]
    });
    await alert.present();
  }

  facebookLogin($event) {
    // if ($event === 'browser') {
    //   this.authService.fbLogin().then(success => {
    //     console.log('Success in fb login browser', success);
    //     this.util.presentToast('Success in fb login browser', true, 'bottom', 2100);
    //     this.authService.createSocialLoginUser(success.user);
    //     this.util.navigate('home', false);
    //   }).catch(err => {
    //     console.log(err.message, 'Error in fb login browser');
    //     this.util.presentToast(`${err.message}`, true, 'bottom', 2100);
    //   });
    // } else {
    //   this.authService.loginWithFacebook($event).then(success => {
    //     console.log('Success in fb login', success);
    //     this.util.presentToast('Success in fb login', true, 'bottom', 2100);
    //     this.authService.createSocialLoginUser(success.user);
    //     this.util.navigate('home', false);
    //   }).catch(err => {
    //     console.log(err.message, 'Error in fb login');
    //     this.util.presentToast(`${err.message}`, true, 'bottom', 2100);
    //   });
    // }
  }

  // twitterLogin($event: any) {
  //   if ($event.isBrowser) {
  //     this.authService.twitterLogin().then(success => {
  //       console.log('Success in twitter login', success);
  //       this.util.presentToast('success in twitter login', true, 'bottom', 2100);
  //       this.authService.createSocialLoginUser(success.user);
  //       this.util.navigate('home', false);
  //     }).catch(err => {
  //       console.log(err.message, 'Error in twitter login');
  //       this.util.presentToast(`${err.message}`, true, 'bottom', 2100);
  //     });
  //   } else {
  //     this.authService.loginWithTwitter($event.token, $event.secret).then(success => {
  //       console.log('Success in twitter login', success);
  //       this.authService.createSocialLoginUser(success.user);
  //       this.util.navigate('home', false);
  //     }).catch(err => {
  //       console.log(err.message, 'Error in twitter login');
  //       this.util.presentToast(`${err.message}`, true, 'bottom', 2100);
  //     });
  //   }
  // }

  googleLogin($event: any) {
    if ($event.isBrowser) {
      this.authService.googleLogin().then(success => {
        console.log('Success in google login', success);
        this.authService.createSocialLoginUser(success.user);
        this.util.navigate('home', false);
      }).catch(err => {
        console.log(err.message, 'Error in google login');
        this.util.presentToast(`${err.message}`, true, 'bottom', 2100);
      });
    } else {
      this.authService.loginWithGoogle($event.idToken, $event.accessToken).then(success => {
        console.log('Success in google login', success);
        this.authService.createSocialLoginUser(success.user);
        this.util.navigate('home', false);
      }).catch(err => {
        console.log(err.message, 'Error in google login');
        this.util.presentToast(`${err.message}`, true, 'bottom', 2100);
      });
    }
  }

}
