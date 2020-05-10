import {buildSchema} from "type-graphql";

export const genSchema = async() => {

    return await buildSchema({
        resolvers: [__dirname + "/resolvers/**/*.ts"]
    })
}