import {Field, ObjectType} from "type-graphql";

// import * as uuidv4 from "uuid/v4";

@ObjectType()
export class FileUpload {

    @Field()
    filename : string;
    @Field()
    mimetype : string;
    @Field()
    encoding : string;

}