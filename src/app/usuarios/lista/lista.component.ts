import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

import * as usuariosActions from '../../store/actions';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: []
})
export class ListaComponent implements OnInit, OnDestroy {

  usuarios: User[] = [];
  loading: boolean;
  error: any;
  subscription: Subscription = new Subscription();

  constructor( private store: Store<AppState> ) { }

  ngOnInit() {
    // this.userService.getUsers().subscribe( users => {
    //   console.log('users response: ', users);
    //   this.usuarios = users || [];
    // });

    this.subscription = this.store.select('usuarios')
    .subscribe( usuarios => {
      console.log('users response abc: ', usuarios);
      this.usuarios = usuarios.users;
      this.loading = usuarios.loading;
      this.error = usuarios.error;
    });

    this.store.dispatch( new usuariosActions.CargarUsuarios());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
