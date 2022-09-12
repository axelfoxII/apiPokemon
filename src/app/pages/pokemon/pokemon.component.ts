import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Habilidades } from 'src/app/interfaces/habilidades.interface';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
 
  nombrePokemon: string='';
  imgPokemon:any;
  habilidades:any;
  descripcion: any;
  especie?: Habilidades;
  noExiste=false;
  imgAnimated:any;
  

  constructor(private pokemonSvc:PokemonService, private activatedRoute: ActivatedRoute) { 

    const {nombre}=this.activatedRoute.snapshot.params;
    
    this.pokemonSvc.getPokemonDetail(nombre).subscribe(pokemon =>{

      
      this.imgAnimated= pokemon.sprites.versions?.['generation-v']['black-white'].animated?.front_default;
      console.log(this.imgAnimated)

        this.imgPokemon =pokemon.sprites.other?.['official-artwork'].front_default;  
        this.nombrePokemon = pokemon.name;

        this.habilidades= pokemon.species;

        
      
        this.pokemonSvc.getHabildades(this.habilidades.url).subscribe((res:Habilidades)=>{

          
          //this.especie= res.genera[5].genus;


          
          for (let i = 0; i < res.genera.length; i++) {
            const element1 = res.genera[i];
            
            if (element1.language.name == 'es') {
              
              this.especie= element1.genus;            
              
            }
          }
          
        
          

          console.log(res);
          
          for (let i = 0; i < res.flavor_text_entries.length; i++) {
            const element2 = res.flavor_text_entries[i];
            
            
            if (element2.language.name == 'es') {
              
              this.descripcion = element2.flavor_text
            
              
            }
            
            
           }

        })


    })


  }

  ngOnInit(): void {
  }

}
