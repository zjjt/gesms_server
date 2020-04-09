import "reflect-metadata";
import "dotenv/config";
import {startServer} from './GraphqlExpress/server';
process.env.NODE_ENV='development';
startServer();
