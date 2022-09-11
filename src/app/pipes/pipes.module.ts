import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSeguroPipe } from './dom-seguro.pipe';



@NgModule({
  declarations: [
    DomSeguroPipe
  ],
  imports: [
    CommonModule
  ], 
  exports:[DomSeguroPipe]
})
export class PipesModule { }
