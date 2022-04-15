// Imports
const { ApolloServer } = require("apollo-server-express");
import expressPlayground from "graphql-playground-middleware-express";
// App Imports
import schema from "../schema";

// Setup GraphQL
export default function (server) {
	console.info("SETUP - GraphQL...");
	const graphQLServer = new ApolloServer({
		schema,
		introspection: true,
	});

	graphQLServer.applyMiddleware({
		app: server,
		cors: {
			origin: true,
			credentials: true,
			methods: ["POST"],
			allowedHeaders: [
				"X-Requested-With",
				"X-HTTP-Method-Override",
				"Content-Type",
				"Accept",
				"Authorization",
				"Access-Control-Allow-Origin",
			],
		},
		playground: {
			settings: {
				"editor.theme": "light",
			},
		},
	});
	server.get(
		"/",
		expressPlayground({
			endpoint: "/graphql",
		})
	);
}
