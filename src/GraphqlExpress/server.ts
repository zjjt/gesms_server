import {ApolloServer} from 'apollo-server-express';
import * as express from 'express';
import {apiRouter} from './routes';
import makeDBconnexion from '../typeORM/connector';
import * as cors from 'cors';
import {genSchema} from './graphqlSchema';
import {Launcher} from '../fonctions/LauncherScheduler';
import * as scheduler from "node-schedule";
import * as bodyParser from 'body-parser';
/*import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import {redis} from './redis';*/

const http=require('http');
// import {processRequest} from "graphql-upload"; import {apolloUploadExpress}
// from 'graphql-upload';

export const startServer = async() => {
    const schema = await genSchema();
    //console.log("type de schema " + typeof schema);
    //console.dir(schema);
    /*const SESSION_SECRET = process.env.NODE_ENV === "test"
        ? "rtyu4376tfvbnm,"
        : process.env.SESSION_SECRET as string;*/
    //const RedisStore = connectRedis(session);
    const server = new ApolloServer({
        schema: schema,
        subscriptions:{
            path:"/subscriptions"
        },
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
    /*app.use(session({
        store: new RedisStore({client: redis as any}),
        name: "pid", // change it to whatever you want
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 *7 // 7 days
        }
    }));*/
    app.use('/', apiRouter);
    //app.use(apolloUploadExpress({maxFileSize: 10000000, maxFiles: 2}));
    server.applyMiddleware({app, cors: corsOptions});
    await makeDBconnexion();
    const httpServer=http.createServer(app);
    server.installSubscriptionHandlers(httpServer);
    const expressApp = await httpServer.listen({
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
//console.log(server);
    scheduler.scheduleJob("launcher", "*/1 * * * *", async() => {
        return await Launcher();
    })
   // console.log(scheduler.scheduledJobs)
    return App;
};