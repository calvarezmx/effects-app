import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as usuariosActions from '../actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';

@Injectable()
export class UsuariosEffects {

    constructor( private actions$: Actions,
        public userService: UsuarioService) {

    }

    @Effect()
    cargarUsuarios$ = this.actions$
    .pipe(
        ofType( usuariosActions.CARGAR_USUARIOS),
        switchMap( () => {
            return this.userService.getUsers()
            .pipe(
                map( users => new usuariosActions.CargarUsuariosSuccess(users)),
                catchError( err => of(new usuariosActions.CargarUsuariosFail( err )))
            );
        })
    );
        // mergeMap(() => this.userService.getUsers()
        // .pipe(
        //     map(movies => ({
        //          type: '[Movies API] Movies Loaded Success', payload: movies }
        //         )),
        //     catchError(() => of({ type: '[Movies API] Movies Loaded Error' }))
        //   ))
        // ).subscribe( res => {
        //     console.log('resp ... : ', res);
        // });
}


