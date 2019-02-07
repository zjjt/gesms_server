declare module 'graphql-upload' {
    import {Readable} from "stream";
    import {Request, Response, NextFunction} from "express";
    import {GraphQLScalarType} from "graphql";

    export interface Upload {
        stream : Readable;
        filename : string;
        mimetype : string;
        encoding : string;
    }

}