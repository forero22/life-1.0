// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  config: {
    apiKey: "AIzaSyCybe35dMhsulU1ZWFpvpx9xHESOjVY4Sk",
    authDomain: "pa-chupar.firebaseapp.com",
    projectId: "pa-chupar",
    storageBucket: "pa-chupar.appspot.com",
    messagingSenderId: "1070745746344",
    appId: "1:1070745746344:web:530de65c7a27f1e603fb9d",
    measurementId: "G-JP5Z6PDYWJ",
    databaseURL: "pa-chupar.firebaseio.com",
  },
  SIDEMENU: [
    {
      title: 'Inicio', url: '/home', icon: 'home',
    },
    {
      title: 'Informacion', url: '/agenda', icon: 'help',
    },
    {
      title: 'GPS', url: '/gps', icon: 'map',
    },
    {
      title: 'Botón de Panico', url: '/sos', icon: 'medkit',
    },
    /**{
      title: 'Cocteles', url: '/cocteles', icon: 'gift',
    },
    {
      title: 'Quesos', url: '/quesos', icon: 'gift',
    },**/
    {
      title: 'Ayuda', url: '/ayuda', icon: 'add-circle',
    },
  ],

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
