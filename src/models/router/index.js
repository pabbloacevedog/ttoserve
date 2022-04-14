// Router dinamicos del usuario
import sequelize, { Model } from "sequelize";

const schema = {
	path: {
		type: sequelize.STRING(100),
		primaryKey: true,
		autoIncrement: false,
	},
	component: {
		type: sequelize.STRING(500),
	},
	name: {
		type: sequelize.STRING(500),
	},
	carpet: {
		type: sequelize.STRING(500),
	},
	leaf: {
		type: sequelize.BOOLEAN,
	},
	children: {
		type: sequelize.STRING(500),
	},
	enabled: {
		type: sequelize.BOOLEAN,
	},
	order_menu: {
		type: sequelize.INTEGER(3),
	},
	icon: {
		type: sequelize.STRING(200),
	},
	addmenu: {
		type: sequelize.BOOLEAN,
	},
	addroute: {
		type: sequelize.BOOLEAN,
	},
};

export default (sequelize) => {
	class Router extends Model {
		static associate(models) {
			// const { Perfil, PerfilRouter } = models
			// Router.belongsToMany(Perfil, {
			//     as: 'perfiles_router',
			// 	through: PerfilRouter ,
			// 	// foreignKey: 'path'
			// });
			// Router.belongsToMany(Perfil, { through: PerfilRouter });
			// this.belongsToMany(sequelize.models.Perfil, { through: 'perfil_router'});
		}
	}
	Router.init(schema, {
		sequelize,
		tableName: "router",
	});
	return Router;
};
