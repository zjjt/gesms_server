import {Resolver ,Mutation, Arg, Subscription, Root, PubSub, Publisher} from 'type-graphql';
import { SmsRapport } from '../../entity/smsauto/SmsRapport';
import {SmsRapport_Inputs}from './inputTypes/SmsRapport_types';
import { sendSMS,  } from '../../fonctions/sendSMS';
import { NotificationPayload, Notification } from '../notification.type';




@Resolver(of => SmsRapport)
export class SmsResolver {
    //private smsRapport:SmsRapport[]|null;
    private autoIncrement=0;

    @Mutation(returns => [SmsRapport])
    async sendSmsMutation(@Arg("data")sms : SmsRapport_Inputs) {
        let res=await sendSMS(sms.typeSms,undefined,{id:sms.senderId,direction:sms.direction},sms.messages,sms.expeditor);
        console.log("resultat d'envoi\n");
        console.dir(res);
        return res;
    }
    @Mutation(returns=>Boolean)
    async setProviderMutation(
        @Arg("provider")provider?:string,
    ){

    }
    @Mutation(returns => Boolean)
    async publisherMutation(
        @PubSub("NOTIFICATIONS") publish:Publisher<NotificationPayload>,
        @Arg("message",{nullable:true})message?:string,
    ):Promise<Boolean>{
        await publish({id:++this.autoIncrement,message});
        return true;
    }

    @Subscription({topics:"NOTIFICATIONS"})
    newNotification(
        @Root(){id,message}:NotificationPayload,
    ):Notification{
        return {
            id,
            message
        }
    }
}