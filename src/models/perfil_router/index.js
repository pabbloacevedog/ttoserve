// Modelo dinamico de los perfiles
import sequelize, { Model } from "sequelize";

const schema = {
	id_perfil: {
		type: sequelize.INTEGER(100),
		primaryKey: true,
		autoIncrement: false,
	},
	path: {
		type: sequelize.STRING(100),
	},
};

export default (sequelize) => {
	class PerfilRouter extends Model {
		static associate(models) {
			const { Perfil, PerfilRouter, Router } = models;
			console.log("models", models);
			// Router.belongsToMany(Perfil, { through: PerfilRouter, foreignKey: 'path',targetKey: 'path' });
			// Perfil.belongsToMany(Router, { through: PerfilRouter , foreignKey: 'id_perfil',sourceKey: 'id_perfil' });
			// this.belongsToMany(sequelize.models.Router, { through: 'perfil_router'});
		}
	}
	PerfilRouter.init(schema, {
		sequelize,
		timestamps: false,
		tableName: "perfil_router",
	});
	return PerfilRouter;
};
