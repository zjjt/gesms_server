
import {InputType, Field} from "type-graphql";
import { Sms } from "../../../entity/smsauto/Sms";
//import { smsArray } from '../../fonctions/sendSMS';

@InputType({description: "Input types for a sms a report"})
export class Sms_Inputs implements Partial < Sms > {
    @Field()
    number:string;
    @Field()
    sms:string;
}
