import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { User } from '../../models/usuario.model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: []
})
export class ListaComponent implements OnInit {

  usuarios: User[] = [];
  constructor( public userService: UsuarioService ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe( users => {
      console.log('users response: ', users);
      this.usuarios = users || [];
    });
  }

}
