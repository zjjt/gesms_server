import {startServer} from "../GraphqlExpress/server";

export const setup = async() => {
    const app = await startServer();
    process.env.TEST_HOST = `http://127.0.0.1:${app.port}`;
};