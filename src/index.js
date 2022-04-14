// Imports
import express from 'express'
import { createServer } from 'http';
// App Imports
import setupLoadModules from './setup/loadModules'
import setupGraphQL from './setup/graphql'
import setupStartServer from './setup/startServer'



// Create express server
const server = express()
// Setup load modules
setupLoadModules(server)
// Setup GraphQL
const httpServer = createServer(server);
setupGraphQL(server, httpServer)
console.info("SETUP - GraphQL cargado.");
// Start server
setupStartServer(httpServer)
