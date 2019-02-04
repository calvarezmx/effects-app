import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as usuarioActions from '../../store/actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { User } from '../../models/usuario.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit, OnDestroy {

  user: User;
  subscription: Subscription = new Subscription();
  loading: boolean;
  error: any;
  constructor( private router: ActivatedRoute , private store: Store<AppState> ) { }

  ngOnInit() {
    this.router.params.subscribe( params => {
      const { id = '' } = params;
      this.store.dispatch( new usuarioActions.CargarUsuario( id ));
    });

    this.subscription = this.store.select('usuario').subscribe( user => {
      this.user = user.user;
      this.loading = user.loading;
      this.error = user.error;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
