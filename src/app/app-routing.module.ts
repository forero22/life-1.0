import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AgendaPageModule } from './pages/informacion/agenda.module';

// Send unauthorized users to login
const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['/walkthrough']);


// Automatically log in users
const redirectLoggedInToHome = () => redirectLoggedInTo(['/home']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    //...canActivate(redirectLoggedInToHome),
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'walkthrough',
    loadChildren: () => import('./pages/walkthrough/walkthrough.module').then(m => m.WalkthroughPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('../app/pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'agenda',
    //...canActivate(redirectLoggedInToHome),
    loadChildren: () => import('./pages/informacion/agenda.module').then(m => m.AgendaPageModule)
  },
  // {
  //   path: 'pedidos',
  //   ...canActivate(redirectLoggedInToHome),
  //   loadChildren: () => import('../app/pages/pedidos/pedidos.module').then(m => m.PedidosPageModule)
  // },
  {
    path: 'productos',
    // ...canActivate(redirectLoggedInToHome),
    loadChildren: () => import('../app/pages/productos/productos.module').then(m => m.ProductosPageModule)
  },
 
    {
    path: 'gps',
    loadChildren: () => import('./pages/gps/gps.module').then( m => m.GpsPageModule)
  },
  {
    path: 'sos',
    loadChildren: () => import('./pages/sos/sos.module').then( m => m.SosPageModule)
  },
  {
    path: 'ayuda',
    loadChildren: () => import('./pages/ayuda/ayuda.module').then( m => m.AyudaPageModule)
  },
  
  // {
  //   path: 'servicios',
  //   ...canActivate(redirectLoggedInToHome),
  //   loadChildren: () => import('../app/pages/servicios/servicios.module').then(m => m.ServiciosPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    AgendaPageModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
