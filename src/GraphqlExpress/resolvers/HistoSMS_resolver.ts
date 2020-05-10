import {Resolver, Query, Arg, Mutation, Args} from 'type-graphql';
import {HistoSMS} from '../../entity/smsauto/HistoSMS';
import {Like, getConnection} from 'typeorm';
import {HistoSMS_Args} from './argsTypes/HistoSMS_args';
import {HistoSMS_Inputs} from './inputTypes/HistoSMS_input';

@Resolver(of => HistoSMS)
export class HistoSMSResolver {
    private HistoSMSCollection : HistoSMS[] = [];

    @Query(returns => [HistoSMS], {nullable: true})
    async listAllHisto(@Args() {
        appId,
        type,
        to,
        qui,
        provider,
        dateEnvoi,
        containMessage
    } : HistoSMS_Args) {
        const histoRepository = getConnection("smsauto").getRepository(HistoSMS);
        //valeur seules
        if (appId && !type && !qui && !to && !dateEnvoi && !containMessage && !provider) {
            this.HistoSMSCollection = await histoRepository.find({
                where: {
                    from: appId
                }
            });
            if (this.HistoSMSCollection.length) 
                return this.HistoSMSCollection;
            else 
                return null;
            }
        else if (!appId && type && !qui && !to && !dateEnvoi && !containMessage && !provider) {
            this.HistoSMSCollection = await histoRepository.find({where: {
                    type
                }});
            if (this.HistoSMSCollection.length) 
                return this.HistoSMSCollection;
            else 
                return null;
            }
        else if (!appId && !type && qui && !to && !dateEnvoi && !containMessage && !provider) {
            this.HistoSMSCollection = await histoRepository.find({
                where: {
                    auBudgetDeLa: qui
                }
            });
            if (this.HistoSMSCollection.length) 
                return this.HistoSMSCollection;
            else 
                return null;
            }
        else if (!appId && !type && !qui && to && !dateEnvoi && !containMessage && !provider) {
            this.HistoSMSCollection = await histoRepository.find({where: {
                    to
                }});
            if (this.HistoSMSCollection.length) 
                return this.HistoSMSCollection;
            else 
                return null;
            }
        else if (!appId && !type && !qui && !to && dateEnvoi && !containMessage && !provider) {
            this.HistoSMSCollection = await histoRepository.find({where: {
                    dateEnvoi
                }});
            if (this.HistoSMSCollection.length) 
                return this.HistoSMSCollection;
            else 
                return null;
            }
        else if (!appId && !type && !qui && !to && !dateEnvoi && containMessage && !provider) {
            this.HistoSMSCollection = await histoRepository.find({
                where: {
                    message: Like(`%${containMessage}%`)
                }
            });
            if (this.HistoSMSCollection.length) 
                return this.HistoSMSCollection;
            else 
                return null;
            }
        else if (!appId && !type && !qui && !to && !dateEnvoi && !containMessage && provider) {
            this.HistoSMSCollection = await histoRepository.find({
                where: {
                    provider
                }
            });
            if (this.HistoSMSCollection.length) 
                return this.HistoSMSCollection;
            else 
                return null;
            }
        else {
            this.HistoSMSCollection = await histoRepository.find();
            if (this.HistoSMSCollection.length) 
                return this.HistoSMSCollection;
            else 
                return null;
            }
        
    }

    async listAllHistoStatus(@Args() {
        appId,
        type,
        sent
    } : HistoSMS_Args) {
        const histoRepository = getConnection("smsauto").getRepository(HistoSMS);
        if (sent == false && !appId && !type) {
            this.HistoSMSCollection = await histoRepository.find({
                where: {
                    isSent: false
                }
            });
            if (this.HistoSMSCollection.length) 
                return this.HistoSMSCollection;
            else 
                return null;
            }
        else if (sent == false && appId && !type) {
            this.HistoSMSCollection = await histoRepository.find({
                where: {
                    isSent: false,
                    from: appId
                }
            });
            if (this.HistoSMSCollection.length) 
                return this.HistoSMSCollection;
            else 
                return null;
            }
        else if (sent == false && appId && type) {
            this.HistoSMSCollection = await histoRepository.find({
                where: {
                    isSent: false,
                    from: appId,
                    type
                }
            });
            if (this.HistoSMSCollection.length) 
                return this.HistoSMSCollection;
            else 
                return null;
            }
        else if (sent == true && !appId && !type) {
            this.HistoSMSCollection = await histoRepository.find({
                where: {
                    isSent: true
                }
            });
            if (this.HistoSMSCollection.length) 
                return this.HistoSMSCollection;
            else 
                return null;
            }
        else if (sent == true && appId && !type) {
            this.HistoSMSCollection = await histoRepository.find({
                where: {
                    isSent: true,
                    from: appId
                }
            });
            if (this.HistoSMSCollection.length) 
                return this.HistoSMSCollection;
            else 
                return null;
            }
        else if (sent == true && appId && type) {
            this.HistoSMSCollection = await histoRepository.find({
                where: {
                    isSent: true,
                    from: appId,
                    type
                }
            });
            if (this.HistoSMSCollection.length) 
                return this.HistoSMSCollection;
            else 
                return null;
            }
        else {
            return null;
        }
    }

    @Mutation(returns => HistoSMS)
    async addHistoSMS(@Arg("data")sms : HistoSMS_Inputs) {
        const histoRepository = getConnection("smsauto").getRepository(HistoSMS);
        const {
            type,
            appId,
            qui,
            message,
            to,
            provider,
            transactionId,
            isSent
        } = sms;
        console.log("content de sms");
        console.dir(sms);
        await histoRepository.save({
            type,
            from: appId,
            auBudgetDeLa: qui,
            message,
            to,
            provider,
            transactionID_API: transactionId,
            isSent
        });
        const voila = await histoRepository.findOne({
            where: {
                type,
                from: appId,
                auBudgetDeLa: qui,
                message,
                to,
                provider,
                transactionID_API: transactionId,
                isSent
            }
        });
        return voila
    }

}
