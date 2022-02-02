import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LoadingController, AlertController, NavController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class UtilService {
  public fooSubject = new Subject<any>();

  userid: BehaviorSubject<string> = new BehaviorSubject<string>('');
  constructor(
    public http: HttpClient,
    public loadingController: LoadingController,
    public fireAuth: Auth,
    public router: Router,
    public toastController: ToastController,
    public nav: NavController,
    public alertController: AlertController
  ) {
    this.getUserId();
  }

  getUserId() {
    this.fireAuth.onAuthStateChanged(user => {
      if (user) {
        this.userid.next(user.uid);
      }
    });
  }

  navigate(link: string, forward?) {
    if (forward) {
      this.nav.navigateForward('/' + link);
    } else {
      this.router.navigateByUrl('/' + link);
    }
  }

  validateEmail(email) {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }


  async presentToast(message, showButton, position, duration) {
    const toast = await this.toastController.create({
      message,
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          handler: () => {
            console.log('Close clicked');
          }
        }
      ],
      position,
      duration
    });
    toast.present();
  }


  removeConform(): Promise<any> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: 'Are you sure you want to remove this item',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (cancel) => {

              resolve('cancel');
            }
          }, {
            text: 'Okay',
            handler: (ok) => {

              resolve('ok');
            }
          }
        ]
      });

      alert.present();
    });
  }

  async openLoader() {
    const loading = await this.loadingController.create({
      message: 'Please Wait ...',
      duration: 2000
    });
    await loading.present();
  }
  async closeLoading() {
    // eslint-disable-next-line no-return-await
    return await this.loadingController.dismiss();
  }

  // Sample API response for content loading
  getApiResponse() {
    const myUrl = 'http://www.mocky.io/v2/5c9215a73200005d006bccee?mocky-delay=5000ms';
    return this.http.get(myUrl);
  }
  // Sample API response for Infinite scrolling
  infiniteData() {
    const myUrl = 'http://www.mocky.io/v2/5c9448a0310000a45b55487c?mocky-delay=5000ms';
    return this.http.get(myUrl);
  }
}
