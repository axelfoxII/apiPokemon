import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Habilidades } from 'src/app/interfaces/habilidades.interface';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  nombrePokemon: string = '';
  imgPokemon: any;
  habilidades: any;
  descripcion: any;
  especie?: Habilidades;
  noExiste = false;
  textoBuscar='';
  imgAnimated:any;

  constructor(private pokemonSvc: PokemonService, private activatedRoute: ActivatedRoute) {

     this.activatedRoute.params.subscribe(params=>{
       this.noExiste = false;
       this.textoBuscar = params['texto'];

       console.log(this.textoBuscar);

       this.pokemonSvc.getPokemonDetail(this.textoBuscar).subscribe({
   
         next: (pokemon) => {

          this.imgAnimated= pokemon.sprites.versions?.['generation-v']['black-white'].animated?.front_default;
          console.log(this.imgAnimated)
   
           this.imgPokemon = pokemon.sprites.other?.['official-artwork'].front_default;
           this.nombrePokemon = pokemon.name;
   
           this.habilidades = pokemon.species;
   
   
   
           this.pokemonSvc.getHabildades(this.habilidades.url).subscribe((res: Habilidades) => {
   
   
   
            for (let i = 0; i < res.genera.length; i++) {
              const element1 = res.genera[i];
              
              if (element1.language.name == 'es') {
                
                this.especie= element1.genus;            
                
              }
            }
   
             for (let i = 0; i < res.flavor_text_entries.length; i++) {
               const element = res.flavor_text_entries[i];
   
   
               if (element.language.name == 'es') {
   
                 this.descripcion = element.flavor_text
                 
   
   
               }
   
   
             }
   
           })
   
              
         },
         error: ()=>{
   
           this.noExiste = true
   
         }
   
   
       })

     })
   

   

  }

  ngOnInit(): void {
  }

}
