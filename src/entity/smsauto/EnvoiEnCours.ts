import {Field, ObjectType} from "type-graphql";

// import * as uuidv4 from "uuid/v4";

@ObjectType()
export class EnvoiEnCours {
    @Field()
    de : string;
    @Field()
    encours : boolean;
}