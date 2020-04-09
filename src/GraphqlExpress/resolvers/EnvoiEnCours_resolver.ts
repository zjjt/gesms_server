
import {Resolver, Arg, Mutation,Ctx, Query} from 'type-graphql';
import {EnvoiEnCours} from '../../entity/smsauto/EnvoiEnCours';
//import {SESSION} from '../routes';
import { Context } from 'apollo-server-core/dist/types';

@Resolver(of => EnvoiEnCours)
export class EnvoiEnCoursResolver {
    @Query(returns => EnvoiEnCours, {nullable: true})
    async getEnCours(@Ctx() ctx: Context) {
    
        return {
            de:ctx.session.de,
            encours:ctx.session.encours
        };
    }
    @Mutation(returns => EnvoiEnCours)
    async setEnCours(@Arg("de", type => String)de: string,@Arg("encours", type => Boolean)encours: boolean,@Ctx() ctx: Context) {
        ctx.session.de=de;
        ctx.session.encours=encours;
        return {
            de:ctx.session.de,
            encours:ctx.session.encours
        };
    }
  
}