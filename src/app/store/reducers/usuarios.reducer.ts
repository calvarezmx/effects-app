import { User } from '../../models/usuario.model';

import * as fromUsers from '../actions';


export interface UsuariosState {
    users: User[];
    loaded: boolean;
    loading: boolean;
    error: any;
}


const initState: UsuariosState = {
    users: [],
    loaded: false,
    loading: false,
    error: null
};


export function usuariosReducer( state = initState, action: fromUsers.UsuariosAcciones ): UsuariosState {
    switch ( action.type ) {

        case fromUsers.CARGAR_USUARIOS:
            return {
                ...state,
                loading: true,
                error: null,
                users: []
            };

        case fromUsers.CARGAR_USUARIOS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                users: [ ...action.usuarios ]
            };

        case fromUsers.CARGAR_USUARIOS_FAIL:
            return {
                ...state,
                loaded: false,
                loading: false,
                error: {
                    status: action.payload.status,
                    message: action.payload.message,
                    url: action.payload.url
                }
            };

        default:
            return state;
    }
}



