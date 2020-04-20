import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.scss']
})
export class PruebasComponent implements OnInit {

  constructor(public auth:AuthService) { }

  ngOnInit(): void {
    // this.auth.ponerUsuario();
  }

}
