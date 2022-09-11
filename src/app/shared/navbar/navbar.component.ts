import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('txtBuscar') buscarInput!:ElementRef

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  regresar(){
    location.href = 'home';
  }

  buscar(texto:string){

   
    texto = texto.trim();

    console.log(texto);

    if (texto.length === 0) {

      return;
      
    }else{

      this.router.navigate(['buscar', texto]);
    this.buscarInput.nativeElement.value = '';
    
    }

    

  }

}
