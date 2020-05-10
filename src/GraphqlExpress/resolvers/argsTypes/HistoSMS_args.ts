import {Field, ArgsType} from "type-graphql";
import {HistoSMS} from '../../../entity/smsauto/HistoSMS';
import {MaxLength} from "class-validator";

@ArgsType()
export class HistoSMS_Args implements Partial < HistoSMS > {
    @Field(type => String, {nullable: true})
    appId
        ?
        : string;
    @Field(type => String, {nullable: true})
    type
        ?
        : string;
    @Field(type => String, {nullable: true})
    @MaxLength(10)
    qui
        ?
        : string;
    @Field(type => String, {nullable: true})
    provider
        ?
        : string
    @Field(type => String, {nullable: true})
    to
        ?
        : string;
    @Field(type => String, {nullable: true})
    dateEnvoi
        ?
        : string;
    @Field(type => String, {nullable: true})
    containMessage
        ?
        : string;
    @Field(type => Boolean, {nullable: true})
    sent
        ?
        : Boolean;
}