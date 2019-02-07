import {Resolver, Arg, Mutation} from 'type-graphql';
import {FileUpload} from '../../entity/smsauto/FileUpload';
import {GraphQLUpload} from 'apollo-server-express';
// 'graphql-upload'; import {GraphQLUpload} from 'apollo-server-core';
const upload = GraphQLUpload;

@Resolver()
export class FileUploadResolver {

    @Mutation(returns => FileUpload)
    async upload(@Arg('fichier', type => upload !)file : any) {
        const {stream, filename, mimetype, encoding} = await file;
        //validate file
        console.log("file stream" + stream);
        return {filename, mimetype, encoding};
    }
}