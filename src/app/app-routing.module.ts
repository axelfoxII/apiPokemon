import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PokemonComponent } from './pages/pokemon/pokemon.component';
import { BuscarComponent } from './pages/buscar/buscar.component';

const routes:Routes=[

  {path:'home', component: HomeComponent},
  {path:'pokemon/:nombre', component: PokemonComponent},
  {path:'buscar/:texto', component: BuscarComponent},

  {path:'', pathMatch:'full', redirectTo:'/home'},
  {path:'**', pathMatch:'full', redirectTo:'/home'},
];

@NgModule({
  
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
