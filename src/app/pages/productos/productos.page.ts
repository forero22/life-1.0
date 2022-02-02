import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '../../services/util.service';
import { Observable } from 'rxjs';
import { ProductosDto, ProductosModel } from '@app/models/productos.model';
import { concatAll, map, shareReplay, switchMap } from 'rxjs/operators';
import { IonContent, MenuController } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { collection, CollectionReference, Firestore, orderBy, query, where } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  @ViewChild('content', { static: true }) content: IonContent;
  public segmentTab: any;
  public data: any;
  public uid: string;

  constructor(
    private route: Router,
    private util: UtilService,
    public firebaseService: FirebaseService,
    private menuCtrl: MenuController
  ) {

    this.segmentTab = 'chat';
    this.util.userid.subscribe(async id => {
      this.uid = id;
      (this.firebaseService.getProductos()).subscribe(listado => {
        this.data = listado as unknown as Observable<ProductosDto[]>;
        // console.log('Productos: ', this.data);
      });
    });
  }

  ngOnInit() {
    //this.data = this.firebaseService.getProductos();
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true, 'start');
    this.menuCtrl.enable(false, 'end');
    // this.content.scrollToTop(300);
    SplashScreen.hide();
  }

  segmentChanged(event: any) {
    this.segmentTab = event.detail.value;
  }

  goforChat(chat) {
    this.route.navigate(['rose', chat]);
  }

}

