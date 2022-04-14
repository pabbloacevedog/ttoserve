// Imports
import {GraphQLString, GraphQLList} from 'graphql'

// App Imports
import UsuarioType from '../type.js'
import {
	traer_todos,
	contar_todos,
	buscar_por_email,
	existe_usuario,
	buscar_usuario,
	datos_usuario,
} from "../resolvers.js";

// Usuarios All
export const Usuarios = {
    type: new GraphQLList(UsuarioType),
    resolve: traer_todos
}
export const ContarUsuarios = {
	type: UsuarioType,
	resolve: contar_todos,
};
// usuario By ID
export const DatosUsuario = {
    type: UsuarioType,
    args: {
        usuario_id: {
            type: GraphQLString
        }
    },
    resolve: datos_usuario
}
export const BuscarUsuarioCorreo = {
    type: UsuarioType,
    args: {
        email: {
            type: GraphQLString
        }
    },
    resolve: buscar_por_email
}
export const ExisteUsuario = {
	type: UsuarioType,
	args: {
		usuario: {
		    type: GraphQLString
		}
	},
	resolve: existe_usuario
}

export const BuscarUsuario = {
	type: new GraphQLList(UsuarioType),
	args: {
		word: {
		    type: GraphQLString
		}
	},
	resolve: buscar_usuario
}
