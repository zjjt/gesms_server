
import {InputType, Field} from "type-graphql";
//import { smsArray } from '../../fonctions/sendSMS';
import { Sms_Inputs } from './SmsInputs';

@InputType({description: "Input types to get a report"})
export class SmsRapport_Inputs {
  @Field(type=>[Sms_Inputs!])
    messages:Sms_Inputs[];
    @Field()
    senderId:string;
    @Field()
    direction:string;
    @Field()
    typeSms:string;
    @Field()
    expeditor:string

}
