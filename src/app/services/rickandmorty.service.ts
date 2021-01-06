import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators'
import { RickAndMortyResponse } from '../interfaces/rick-and-morty-response';

@Injectable({
  providedIn: 'root'
})

export class RickandmortyService {

  private contadorPagina = 1;
  private uri = 'https://rickandmortyapi.com/api/character';
  public carga: boolean = false;

  constructor( private http: HttpClient ) {

  }

  get parametros() {
    return{
      page: this.contadorPagina.toString()
    }
  }

obtenerPersonajes(): Observable<RickAndMortyResponse> {

  if( this.carga ){
    return of<RickAndMortyResponse>();
  }

  this.carga = true;
    return this.http.get<RickAndMortyResponse>(`${this.uri}`,{
      params: this.parametros
    }).pipe(
      tap( () =>{
          this.contadorPagina += 1;
          this.carga = false;
      })
    );
}

}
