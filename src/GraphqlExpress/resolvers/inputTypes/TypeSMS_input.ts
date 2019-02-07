import {InputType, Field} from "type-graphql";
import {TypeSMS} from "../../../entity/smsauto/TypeSMS";

@InputType({description: "Types of Sms used in the app"})
export class TypeSMS_Inputs implements Partial < TypeSMS > {
    @Field({nullable: true})
    type
        ?
        : string;
    @Field({nullable: true})
    message
        ?
        : string;

}
@InputType({description: "Types of Sms used in the app"})
export class TypeSMS_IdForced_Inputs extends TypeSMS_Inputs implements Partial < TypeSMS > {

    @Field()
    id : string

}