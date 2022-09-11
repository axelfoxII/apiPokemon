import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {  map } from 'rxjs/operators';
import { Habilidades } from '../interfaces/habilidades.interface';
import { PokemonDetails } from '../interfaces/pokemon.interface';
import { Pokemon, PokemonesResponse } from '../interfaces/pokemones.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  //https://pokeapi.co/api/v2/pokemon?limit=20&offset=40

  private baseURL: string = 'https://pokeapi.co/api/v2';
  private limitPage = 20;
  public offsetPage = 0;


  constructor(private http:HttpClient) { }

  get params() {
    return {
      limit:this.limitPage,
      offset:this.offsetPage
    }
  }

  getPokemons():Observable<Pokemon[]>{
   
    return this.http.get<PokemonesResponse>(`${this.baseURL}/pokemon`,{params:this.params}).pipe(
    map(res=>res.results)
   )
  }

  getPokemonDetail(nombre:string):Observable<PokemonDetails>{

    return this.http.get<PokemonDetails>(`${this.baseURL}/pokemon/${nombre}`);

  }

 
  getHabildades(url: string):Observable<Habilidades>{

    return this.http.get<Habilidades>(`${url}`);

  }

  getPaginacionNext(adelante:number){
   
    this.offsetPage = this.offsetPage + adelante    

    console.log(this.offsetPage);
    
    return this.http.get<PokemonesResponse>(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${this.offsetPage}`).pipe(
    map(res=>res.results)
   )
  }

  getPaginacionPrevious(atras:number){
    

    this.offsetPage= this.offsetPage - atras;
    
    console.log(this.offsetPage);

    if (this.offsetPage === 0  ) {

      localStorage.setItem('Valor','detener');
      
    }
    
    return this.http.get<PokemonesResponse>(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${this.offsetPage}`).pipe(
    map(res=>res.results)
   )

  
  }

}
