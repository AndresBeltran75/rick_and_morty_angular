import { Component, HostListener, OnInit } from '@angular/core';
import { Result } from 'src/app/interfaces/rick-and-morty-response';
import { RickandmortyService } from 'src/app/services/rickandmorty.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public response: Result[] = [];

  @HostListener('window:scroll', ['$event'])

  scroll(){
    const posicion = ( document.documentElement.scrollTop || document.body.scrollTop ) + 1900;
    const max = ( document.documentElement.scrollHeight || document.body.scrollHeight );

    if( posicion > max ){
      if( !this.service.carga ){
        this.service.obtenerPersonajes().subscribe( salida =>{
          this.response.push(...salida.results);
        });
      }
    }

  }

  constructor( private service: RickandmortyService ){
    this.service.obtenerPersonajes()
      .subscribe( resp => {
        this.response = resp.results;
      });
}

  ngOnInit(): void {
    
  }

}
