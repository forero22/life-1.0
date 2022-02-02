import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, MenuController } from '@ionic/angular';
import { UtilService } from '../../services/util.service';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('content', { static: true }) content: IonContent;
  public isUpdate: boolean;
  public uid: string;
  public filtertag: any;
  public customAlertOptions: any = {
    header: 'Filter',
  };
  constructor(
    private util: UtilService,
    private menuCtrl: MenuController
  ) {

  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true, 'start');
    this.menuCtrl.enable(false, 'end');
    this.content.scrollToTop(300);
    SplashScreen.hide();
  }

  scroll() {
    this.content.scrollToTop(300);
  }

  addQuestionToDB() {
  }

  newQuestion() {
  }

  editQuestion(questionId: string) {
  }

  updateQuestion() {
  }

  cancelUpdate() {
    this.isUpdate = false;
  }

  alertFilter() {
    document.getElementById('filterSelect').click();
  }

  tagValue(value) {
    console.log(value);
  }

  headTagValue(filterName: string) {
  }

  deleteQuestion(id) {
  }

}
