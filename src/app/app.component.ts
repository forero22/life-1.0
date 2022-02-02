import { Component, OnInit } from '@angular/core';
import { Router, Navigation } from '@angular/router';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { environment } from '@env/environment';
import { UtilService } from '@app/services/util.service';
import { getAuth, signOut } from 'firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public sidemenu = 1;
  public showChildren = '';
  public sidemenuLayout1: Array<any>;
  public beginnerMenu: Array<any>;
  public startupMenu: Array<any>;
  public proMenu: Array<any>;
  public email: any;
  public email2: any;
  public current_user: any;
  constructor(
    private platform: Platform,
    private route: Router,
    private util: UtilService,
    public modalCtrl: ModalController,
    private alertController: AlertController
  ) {
    this.beginnerMenu = environment.SIDEMENU;
  }
  ngOnInit(): void {
    // this.current_user = this.authService.current_user;
  }

  showSidemenu(index: number) {
    this.sidemenu = index + 1;
  }

  expandMenu(title) {
    if (this.showChildren === title) {
      this.showChildren = '';
    } else {
      this.showChildren = title;
    }
  }

  async redirectPage(option) {

    if (option.alert) {
      if (option.alert === 'apple_pay') {
        if (!this.platform.is('ios')) { this.presentAlertConfirm(); }
      }
      return;
    }
    if (option.disabled) {
      return;
    }
    if (option.url === '/logout') {
      this.logout();
    } else {
      this.route.navigate([option.url]);
    }
  }

  logout() {
    const authentication = getAuth();
    return signOut(authentication)
      .then(() => {
        console.log('logged out');
        this.route.navigate(['/walkthrough']);
      })
      .catch((error) => {
        console.log(error);
      });

    // this.authService.logout().then(() => {
    //   this.util.navigate('login', false);
    // });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Dear User',
      message: 'Apple Pay Payment will only work on Apple Device or Simulator',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
          }
        }
      ]
    });

    await alert.present();
  }

}
