import {Field, ObjectType} from "type-graphql";

// import * as uuidv4 from "uuid/v4";

@ObjectType()
export class SmsRapport {
    @Field()
    sender:string;
    @Field()
    number : string;
    @Field()
    sms : string;
    @Field()
    heure_envoi:string;
    @Field()
    status:boolean;
}