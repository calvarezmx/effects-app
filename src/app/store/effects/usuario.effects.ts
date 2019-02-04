import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as usuarioActions from '../actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';

@Injectable()
export class UsuarioEffects {

    constructor( private actions$: Actions,
        public userService: UsuarioService) {
    }

    @Effect()
    cargarUsuario$ = this.actions$
    .pipe(
        ofType( usuarioActions.CARGAR_USUARIO),
        switchMap( (action: usuarioActions.CargarUsuario) => {
            const { id = '' } = action;
            return this.userService.getUserById( id )
            .pipe(
                map( user => new usuarioActions.CargarUsuarioSuccess(user)),
                catchError( err => of(new usuarioActions.CargarUsuarioFail( err )))
            );
        })
    );
}


