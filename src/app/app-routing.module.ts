import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LearnComponent } from './learn/learn.component';
import { CheckComponent } from './check/check.component';
import { ErgebnisComponent } from './ergebnis/ergebnis.component';
import { PrufungComponent } from './prufung/prufung.component'
const routes: Routes = [


  { path: '', component:HomeComponent},
  { path: 'learn', component:LearnComponent},
  { path: 'check', component:CheckComponent},
  { path: 'ergebnis', component:ErgebnisComponent},
  { path: 'exam',component: PrufungComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
