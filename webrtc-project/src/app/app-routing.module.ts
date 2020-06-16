import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from '../app/app.component';
// import {TestJSComponent} from '../app/test-js/test-js.component';

const routes: Routes = [
  // { path: 'test', component: TestJSComponent },
  { path: 'caller', component: AppComponent },
  { path: 'reciever', component: AppComponent },
  { path: '700', component: AppComponent },
  { path: '800', component: AppComponent },
  { path: '900', component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents =[AppComponent];
