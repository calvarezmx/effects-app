import { User } from '../../models/usuario.model';

import * as fromUser from '../actions';


export interface UsuarioState {
    user: User;
    loaded: boolean;
    loading: boolean;
    error: any;
}


const initState: UsuarioState = {
    user: null,
    loaded: false,
    loading: false,
    error: null
};


export function usuarioReducer( state = initState, action: fromUser.UsuarioAcciones ): UsuarioState {
    switch ( action.type ) {

        case fromUser.CARGAR_USUARIO:
            return {
                ...state,
                loading: true,
                error: null,
                user: null
            };

        case fromUser.CARGAR_USUARIO_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                user: { ...action.usuario }
            };

        case fromUser.CARGAR_USUARIO_FAIL:
            return {
                ...state,
                loaded: false,
                loading: false,
                error: {
                    status: action.payload.status,
                    message: action.payload.message,
                    url: action.payload.url
                },
                user: null
            };

        default:
            return state;
    }
}



