import {Field, ObjectType} from "type-graphql";

// import * as uuidv4 from "uuid/v4";

@ObjectType()
export class Sms {
    @Field()
    number : string;
    @Field()
    sms : string;
}