// Imports
// import { sequelize } from "sequelize";
import Sequelize from "sequelize";
// App Imports
import env from "../config/env";
import databaseConfig from "../config/database.json";

// Load database config
const databaseConfigEnv = databaseConfig[env];
//console.info("SETUP - databaseConfigEnv", databaseConfigEnv);
// Create new database connection
const connection = new Sequelize(
	databaseConfigEnv.database,
	databaseConfigEnv.username,
	databaseConfigEnv.password,
	{
		host: databaseConfigEnv.host,
		dialect: databaseConfigEnv.dialect,
		port: databaseConfigEnv.port,
		logging: false,
		freezeTableName: true,
		pool: {
			max: 15,
			min: 5,
			idle: 20000,
			evict: 15000,
			acquire: 30000,
		},
	}
);
// Test connection
console.info("SETUP - Conectando Base de datos...");

connection
	.authenticate()
	.then(() => {
		console.info("INFO  - Base de datos conectada.");
	})
	.catch((err) => {
		console.error("ERROR - Incapaz conectar base de datos:", err);
	});

export default connection;
