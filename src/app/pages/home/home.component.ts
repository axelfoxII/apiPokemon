import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/interfaces/pokemones.interface';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pokemones:Pokemon[]=[];
  adelante=0;
  atras=0;
  btnActive=true;

  constructor(private pokemosnSvc:PokemonService, private router:Router) { }

  ngOnInit(): void {

    localStorage.removeItem('Valor');

    this.pokemosnSvc.getPokemons().subscribe(res=>{
      this.pokemones=res;
      
    })   

  }

  onclickPokemon(nombre:string){
   this.pokemosnSvc.getPokemonDetail(nombre).subscribe(pokemon=>{
    
    this.router.navigate(['/pokemon', pokemon.name])

   })
  }

  paginarNext(){

    this.adelante=20

    
    this.pokemosnSvc.getPaginacionNext(this.adelante).subscribe(res=>{
      this.pokemones=res;
     
      
    })   

    localStorage.removeItem('Valor');   
    this.btnActive=false;

   

  }

  paginarPreviuos(){  

    this.atras= 20;

   
    this.pokemosnSvc.getPaginacionPrevious(this.atras).subscribe(res=>{
      this.pokemones=res;
      console.log(res)     
      if (localStorage.getItem('Valor')==='detener') {
        this.btnActive=true;
      }
      
    })
 
    
  }

}
