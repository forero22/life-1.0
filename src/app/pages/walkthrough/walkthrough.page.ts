import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { Platform, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { APP_SLIDES } from './data/walkthrough-data';   

@Component({
  selector: 'app-walkthrough',
  templateUrl: './walkthrough.page.html',
  styleUrls: ['./walkthrough.page.scss'],
})
export class WalkthroughPage implements OnInit {
  public slideOpts = {
    effect: 'flip',
  };
  public slides: Array<any>;

  constructor(
    public platform: Platform,
    public route: Router,
    public menuCtrl: MenuController
  ) {

    this.menuCtrl.enable(false);
    this.slides = APP_SLIDES;
  }

  ngOnInit() {
  }

  sliderChanges(event: any) {
  }

  skip() {
    this.route.navigate(['login']);
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'start');
    this.menuCtrl.enable(false, 'end');
    this.platform.ready().then(() => {
      SplashScreen.hide();
    });
  }


}
