// Imports
import { GraphQLUpload } from 'apollo-server-koa'
import {
	GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull
} from 'graphql'

// App Imports
import OpTrabajoType from '../type'
import OpTrabajoList from '../inputType'
import {
	create,
    remove,
    edit,
    remove_more
} from '../resolvers'
// User Register
export const createOpTrabajo = {
	type: OpTrabajoType,
	args: {
        cargo: {
            name: 'cargo',
			type: GraphQLString
		},
		descripcion:{
            name: 'descripcion',
			type: GraphQLString
		},
        link: {
            name: 'link',
            type: GraphQLString
        },
        hotel: {
            name: 'hotel',
            type: GraphQLString
        },
        web: {
            name: 'web',
            type: GraphQLString
        },
        file: {
            name: 'file',
            type: GraphQLNonNull(GraphQLUpload)
        },
        estado: {
			name: 'estado',
			type: GraphQLBoolean
		}
	},
	resolve: create
}
export const editOpTrabajo = {
	type: OpTrabajoType,
	args: {
        codigo: {
			name: 'codigo',
			type: GraphQLInt
		},
        cargo: {
            name: 'cargo',
			type: GraphQLString
		},
		descripcion:{
            name: 'descripcion',
			type: GraphQLString
		},
        link: {
            name: 'link',
            type: GraphQLString
        },
        hotel: {
            name: 'hotel',
            type: GraphQLString
        },
        web: {
            name: 'web',
            type: GraphQLString
        },
        file: {
            name: 'file',
            type: GraphQLNonNull(GraphQLUpload)
        },
        estado: {
			name: 'estado',
			type: GraphQLBoolean
		}
	},
	resolve: edit
}
// User remove
export const OpTrabajoRemove = {
	type: OpTrabajoType,
	args: {
		codigo: {
			name: 'codigo',
			type: GraphQLInt
		}
	},
	resolve: remove
}
export const removeOpTrabajo = {
    type: OpTrabajoType,
    args: {
		id: {
            name: 'id',
			type: GraphQLList(OpTrabajoList)
		}
	},
	resolve: remove_more
}