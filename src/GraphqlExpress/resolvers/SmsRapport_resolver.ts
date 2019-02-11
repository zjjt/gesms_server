import {Resolver ,Mutation, Arg} from 'type-graphql';
import { SmsRapport } from '../../entity/smsauto/SmsRapport';
import {SmsRapport_Inputs}from './inputTypes/SmsRapport_types';
import { sendSMS,  } from '../../fonctions/sendSMS';




@Resolver(of => SmsRapport)
export class SmsResolver {
    //private smsRapport:SmsRapport[]|null;

    @Mutation(returns => [SmsRapport])
    async sendSmsMutation(@Arg("data")sms : SmsRapport_Inputs) {
        let res=await sendSMS(sms.typeSms,undefined,{id:sms.senderId,direction:sms.direction},sms.messages,sms.expeditor);
        console.log("resultat d'envoi\n");
        console.dir(res);
        return res;
    }
}