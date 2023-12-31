import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from "./components/details/details.component";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    component:DetailsComponent,
    path:'details',
  },
  {
    path:'***',
    redirectTo:'/home',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
