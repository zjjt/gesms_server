import {InputType, Field} from "type-graphql";
import {HistoSMS} from '../../../entity/smsauto/HistoSMS';
import {MaxLength, Length} from "class-validator";

@InputType({description: "for a new row representing SMS"})
export class HistoSMS_Inputs implements Partial < HistoSMS > {

    @Field()
    type : string;
    @Field()
    appId : string;
    @Field()
    @MaxLength(10)
    qui : string;
    @Field()
    @MaxLength(10)
    provider : string;
    @Field()
    message : string;
    @Field()
    @Length(8, 8)
    to : string;
    @Field()
    transactionId : string;
    @Field()
    isSent : boolean;

}