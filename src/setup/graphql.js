// Imports
const { ApolloServer } = require("apollo-server-express");
import expressPlayground from "graphql-playground-middleware-express";
import fs, { createWriteStream, unlink } from "fs";
// App Imports
import schema from "../schema";
import mkdirp from "mkdirp";
const UPLOAD_DIR = "./public/banner";

if (!fs.existsSync(UPLOAD_DIR)) {
	mkdirp.sync(UPLOAD_DIR);
}
const storeUpload = async (upload) => {
	try {
		console.log("upload", upload);
		debugger;
		const { createReadStream, filename, mimetype } = await upload;
		var name = filename;
		const stream = createReadStream();
		const carpet = `${UPLOAD_DIR}`;
		if (!fs.existsSync(carpet)) {
			mkdirp.sync(carpet);
		}
		const path = `${carpet}/${name}`;
		const path_bd = `banner/${name}`;
		// Store the file in the filesystem.
		await new Promise((resolve, reject) => {
			// Create a stream to which the upload will be written.
			const writeStream = createWriteStream(path);

			// When the upload is fully written, resolve the promise.
			writeStream.on("finish", resolve);

			// If there's an error writing the file, remove the partially written file
			// and reject the promise.
			writeStream.on("error", (error) => {
				unlink(path, () => {
					reject(error);
				});
			});
			// In node <= 13, errors are not automatically propagated between piped
			// streams. If there is an error receiving the upload, destroy the write
			// stream with the corresponding error.
			stream.on("error", (error) => writeStream.destroy(error));
			// Pipe the upload into the write stream.
			stream.pipe(writeStream);
		});
		return path_bd;
	} catch (error) {
		console.error(error);
		// expected output: ReferenceError: nonExistentFunction is not defined
		// Note - error messages will vary depending on browser
		return error;
	}
};
// Setup GraphQL
export default function (server) {
	console.info("SETUP - GraphQL...");
	const graphQLServer = new ApolloServer({
		schema,
		introspection: true,
		context: { storeUpload },
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
