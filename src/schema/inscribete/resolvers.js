// App Imports
import models from '../../models'
// Get users by ID
export async function getById(parentValue, {codigo}) {
	return await models.Inscribete.findOne({ where: { codigo } })
}

// Get all users
export async function getAll(parentValue, {}) {
	return await models.Inscribete.findAll({order: [
        ['codigo', 'DESC']
    ],})
}

// Delete user
export async function remove({codigo}) {
	return await models.Inscribete.destroy({where: {codigo}})
}
// Create user
export async function create(parentValue,{ titulo, descripcion, link, boton, file, estado  }, { storeUpload }) {
    var create = false
    var error = ''
    console.log('file',file)
    console.log('titulo',titulo)
    var banner = ''
    if(typeof file=== 'object'){
        banner = await storeUpload(file)
    }
    console.log('banner',banner)
	await models.Inscribete.create({
        titulo, descripcion, link, boton, banner, estado 
	}).then(inscribete => {
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
		throw new Error(`Error al crear el registro de publicidad ` + error)
	}
}
export async function edit(parentValue,{ codigo, titulo, descripcion, link, boton, file, estado  },{ storeUpload }) {
    var editado = false
    var error = ''
    var banner = file
    if(typeof file=== 'object'){
        banner = await storeUpload(file)
    }
    console.log('banner',banner)
    
    var editar = {
        titulo, descripcion, link, boton, banner, estado 
    }
    await models.Inscribete.update(editar, { where: { codigo } }).then(act => {
        editado = true
    }).catch(err => {
        console.log(err)
        error = err
    })
	if(editado){
		return { editado: editado }
	}
	else{
		throw new Error(`Error al editar el registro de publicidad ` + error)
	}
}
export async function remove_more(parentValue,{ id  }) {
    var eliminado = true
    var error = ''
    console.log('remove_more',id)

    id.forEach(element => {
        console.log(element.codigo)
        models.Inscribete.destroy({where: {codigo : element.codigo}})
        // .then(act => {
        //     eliminado = true
        // }).catch(err => {
        //     console.log(err)
        //     error = err
        // })
    });
	if(eliminado){
		return { eliminado: eliminado }
	}
	else{
		throw new Error(`Error al eliminar el registro de publicidad ` + error)
	}
}

