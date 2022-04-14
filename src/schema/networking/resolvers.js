// App Imports
import models from '../../models'
// Get users by ID
export async function getById(parentValue, {codigo}) {
	return await models.Networking.findOne({ where: { codigo } })
}

// Get all users
export async function getAll(parentValue, {}) {
    var as = await models.Networking.findAll({order: [
        ['codigo', 'DESC']
    ]})
	return as
}

// Delete user
export async function remove({codigo}) {
	return await models.Networking.destroy({where: {codigo}})
}
// Create user
export async function create(parentValue,{ titulo, descripcion, estado  }) {
    var create = false
    var error = ''
    let codigo = 0
	await models.Networking.create({
        titulo, descripcion, estado 
	}).then(networking => {
		codigo = networking.codigo
        create = true
        
	}).catch(err => {
		console.log(err)
		error = err
	})
	console.log('fin')
	if(create){
		return { creado: create }
	}
	else{
		throw new Error(`Error al crear el networking ` + error)
	}
}
export async function edit(parentValue,{ codigo, titulo, descripcion, estado }) {
    var editado = false
    var error = ''
    var editar = {
        titulo, descripcion, estado 
    }
    await models.Networking.update(editar, { where: { codigo } }).then(act => {
        editado = true
    }).catch(err => {
        console.log(err)
        error = err
    })
	if(editado){
		return { editado: editado }
	}
	else{
		throw new Error(`Error al editar el networking ` + error)
	}
}
export async function remove_more(parentValue,{ id  }) {
    var eliminado = true
    var error = ''
    console.log(models.Networking)

    id.forEach(element => {
        console.log(element.codigo)
        models.Networking.destroy({where: {codigo : element.codigo}})
    });
	if(eliminado){
		return { eliminado: eliminado }
	}
	else{
		throw new Error(`Error al eliminar el networking ` + error)
	}
}