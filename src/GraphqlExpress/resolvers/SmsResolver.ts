import { Sms } from '../../entity/smsauto/Sms';
import {Resolver, Query} from 'type-graphql';

@Resolver(of=>Sms)
export class smsResolver{
    private sms:Sms[];
    @Query(returns=>[Sms])
    async getSms(){
        return this.sms;
    }
}