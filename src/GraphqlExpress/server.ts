import {ApolloServer} from 'apollo-server-express';
import * as express from 'express';
import {apiRouter} from './routes';
import makeDBconnexion from '../typeORM/connector';
import * as cors from 'cors';
import {genSchema} from './graphqlSchema';
import {Launcher} from '../fonctions/LauncherScheduler';
import * as scheduler from "node-schedule";
import * as bodyParser from 'body-parser';
// import {processRequest} from "graphql-upload"; import {apolloUploadExpress}
// from 'graphql-upload';

export const startServer = async() => {
    const schema = await genSchema();
    //console.log("type de schema " + typeof schema);
    //console.dir(schema);
    const server = new ApolloServer({
        schema: schema,
        /*context: async({req} : any) => ({
            redis,
            url: req.protocol + "://" + req.get("host"),
            session: req.session
        })*/
    });
    const app = express();
    let port = process.env.PORT || 3000;
    const corsOptions = {
        credentials: true,
        origin: process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development"
            ? "*"
            : (process.env.FRONTEND_HOST as string)
    }
    app.use(bodyParser({limit: '50mb'}));
    app.use(cors(corsOptions));
    app.use('/', apiRouter);
    //app.use(apolloUploadExpress({maxFileSize: 10000000, maxFiles: 2}));
    server.applyMiddleware({app, cors: corsOptions});
    await makeDBconnexion();
    const expressApp = await app.listen({
        port: process.env.NODE_ENV === "test"
            ? 4005
            : 4000
    }, () => {
        port = process.env.NODE_ENV === "test"
            ? 4005
            : 4000;
        console.log(`GraphQL server running at http://localhost:${port}${server.graphqlPath}`)
    })
    const App = {
        expressApp,
        port: process.env.NODE_ENV === "test"
            ? 4005
            : 4000,
        server
    };

    scheduler.scheduleJob("launcher", "*/1 * * * *", async() => {
        return await Launcher();
    })
    console.log(scheduler.scheduledJobs)
    return App;
};