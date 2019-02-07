import {Resolver, Query, Arg, Mutation} from 'type-graphql';
import {TypeSMS} from '../../entity/smsauto/TypeSMS';
import {getConnection} from 'typeorm';
import {TypeSMS_Inputs, TypeSMS_IdForced_Inputs} from './inputTypes/TypeSMS_input';

@Resolver(of => TypeSMS)
export class TypeSMSResolver {

    private type : TypeSMS | undefined;
    @Query(returns => [TypeSMS], {nullable: true})
    async listAllTypeSMS() {
        const typeSmsRepository = getConnection("smsauto").getRepository(TypeSMS);
        return await typeSmsRepository.find();

    }
    @Query(returns => TypeSMS, {nullable: true})
    async getTypeSMS(@Arg("id", type => String, {nullable: true})id : string, @Arg("typeSms", type => String, {nullable: true})typeSms : string) {
        const typeSmsRepository = getConnection("smsauto").getRepository(TypeSMS);
        if (id && !typeSms) 
            return await typeSmsRepository.findOne({where: {
                    id
                }});
        else if (!id && typeSms) 
            return await typeSmsRepository.findOne({
                where: {
                    type: typeSms
                }
            });
        else 
            return null;
        }
    @Mutation(returns => TypeSMS)
    async addTypeSMS(@Arg("data")typesms : TypeSMS_Inputs) {
        const typeSmsRepository = getConnection("smsauto").getRepository(TypeSMS);
        const {type, message} = typesms;
        if (type && message) {
            await typeSmsRepository.save({type, message});
            const voila = await typeSmsRepository.findOne({
                where: {
                    type,
                    message
                }
            });
            return voila
        } else {
            return null;
        }

    }
    @Mutation(returns => TypeSMS)
    async updateTypeSMS(@Arg("data")typesms : TypeSMS_IdForced_Inputs) {
        const typeSmsRepository = getConnection("smsauto").getRepository(TypeSMS);
        const {id, type, message} = typesms;
        const foundInDB = await typeSmsRepository.findOne({where: {
                id
            }});

        if (foundInDB) {
            await typeSmsRepository.update(id, {
                type: type
                    ? type
                    : foundInDB.type,
                message: message
                    ? message
                    : foundInDB.message
            });
            this.type = await typeSmsRepository.findOne({where: {
                    id
                }});

            return this.type;
        } else 
            return null;

        }
    
    @Mutation(returns => TypeSMS)
    async updatePropsOfTypeSMS(@Arg("id", type => String)id : string, @Arg("freq", type => Number, {nullable: true})freq
        ?
        : number, @Arg("time", type => String, {nullable: true})time
        ?
        : string, @Arg("activated", type => Boolean, {nullable: true})activated
        ?
        : boolean) {
        const typeSmsRepository = getConnection("smsauto").getRepository(TypeSMS);
        const foundInDB = await typeSmsRepository.findOne({where: {
                id
            }});

        if (foundInDB) {
            await typeSmsRepository.update(id, {
                frequence: freq
                    ? freq
                    : foundInDB.frequence,
                timeOfLaunch: time
                    ? time
                    : foundInDB.timeOfLaunch,
                activated: activated
                    ? activated
                    : foundInDB.activated
            });
            this.type = await typeSmsRepository.findOne({where: {
                    id
                }});

            return this.type;
        } else 
            return null;
        }
    
}
