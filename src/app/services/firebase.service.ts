import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { collection, collectionData, CollectionReference, Firestore, query, where, runTransaction, setDoc, getDocs } from '@angular/fire/firestore';
import { AgendasDto } from '@app/models/agendas.model';
import { ProductosDto } from '@app/models/productos.model';
import { addDoc, doc, DocumentReference, FieldValue, orderBy, serverTimestamp, Transaction } from '@firebase/firestore';
import { switchMap, map, concatAll, shareReplay } from 'rxjs/operators';
import { leftJoinCategorias, leftJoinClientes } from './collectionJoin';

export interface User {
  uid: string;
  email: string;
}

export interface Message {
  createdAt: FieldValue;
  id: string;
  from: string;
  msg: string;
  fromName: string;
  myMsg: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  getInfo() {
    throw new Error('Method not implemented.');
  }

  currentUser: User = null;

  constructor(
    private afAuth: Auth,
    private afs: Firestore) {
    this.afAuth.onAuthStateChanged(user => {
      // console.log('Changed: ', user);
      this.currentUser = user;
    });
  }


  //#region Auth
  async signUp({ email, password }) {
    const credential = await createUserWithEmailAndPassword(
      this.afAuth,
      email,
      password
    );

    console.log('result: ', credential);
    const uid = credential.user.uid;

    // var docRef: DocumentReference = null;
    // docRef = doc(this.afs,
    //   'users/${uid}'
    // );
    return setDoc(doc(this.afs,
      'users/${uid}'
    ), {
      uid,
      email: credential.user.email
    });
  }

  signIn({ email, password }) {
    return signInWithEmailAndPassword(this.afAuth, email, password);
  }

  signOut() {
    return this.afAuth.signOut();
  }

  addChatMessage(msg) {
    return addDoc(collection(this.afs, 'messages'), {
      msg,
      from: this.currentUser.uid,
      createdAt: serverTimestamp()
    });
  }

  getChatMessages() {
    let users = [];

    return this.getUsers().pipe(
      switchMap(res => {
        users = res;
        console.log('all users: ', users);
        return collectionData<Message>(
          query<Message>(
            collection(this.afs, 'messages') as CollectionReference<Message>,
            orderBy('createdAt')
          ), { idField: 'id' }
        );
      }),
      map(messages => {
        for (let m of messages) {
          m.fromName = this.getUserForMsg(m.from, users);
          m.myMsg = this.currentUser.uid === m.from;
        }
        console.log('all messages: ', messages);
        return messages;
      })
    )
  }

  getUsers() {
    return collectionData<User>(
      query<User>(
        collection(this.afs, 'users') as CollectionReference<User>,
        // where('published', '==', true)
      ), { idField: 'uid' }
    );
  }

  getUserForMsg(msgFromId, users: User[]): string {
    for (let usr of users) {
      if (usr.uid == msgFromId) {
        return usr.email;
      }
    }
    return 'Deleted';
  }
  //#endregion Auth


  //#region Agenda

  getAgenda() {
    return collectionData<AgendasDto>(
      query<AgendasDto>(
        collection(this.afs, 'agendas') as CollectionReference<AgendasDto>,
        where('activa', '==', true)
      ), { idField: 'id' }
    ).pipe(
      leftJoinClientes(this.afs, 'clienteId', 'clientes'),
      shareReplay(1)
    );
  }

  //#endregion Agenda


  //#region Productos

  getProductos() {
    return collectionData<ProductosDto>(
      query<ProductosDto>(
        collection(this.afs, 'productos') as CollectionReference<ProductosDto>,
        where('activo', '==', true)
      ), { idField: 'id' }
    ).pipe(
      leftJoinCategorias(this.afs, 'categoriaId', 'categorias'),
      shareReplay(1)
    );
  }

  //#endregion Productos


}
