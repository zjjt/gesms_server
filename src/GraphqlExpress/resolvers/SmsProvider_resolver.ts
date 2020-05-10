import {Resolver, Arg, Mutation, Query,} from 'type-graphql';
import {SmsProvider} from '../../entity/smsauto/SmsProvider';
import {getConnection,Not} from 'typeorm';
import moment = require('moment');
const axios = require('axios');
//import * as $ from 'jquery';
async function getOrangeToken(){
    let str = "";
    let token;
    const req={
        grant_type:'client_credentials'
    };
    
        str += "grant_type" + "=" + encodeURIComponent(req.grant_type);

        const getTokenOptions={
            method:'post',
            url:'https://api.orange.com/oauth/v2/token',
            withCredentials:true,
            crossDomain:true,
            headers:{
                'Authorization': process.env.ORANGE_AUTH as string,
                'content-type': 'application/x-www-form-urlencoded'
            },
            data:str
        };
        try{
            token=await axios(getTokenOptions); 
        }catch(err){
            console.dir(err);    
        }
        return token.data.access_token;
    }

async function  getSmsBalance(){
    let token='';
    try{
        token=await getOrangeToken(); 
        console.log("token is "+token);
        console.dir(token);
    }catch(err){
        console.dir(err);    
    }
    if(token && token !=''){
    const getBalanceOptions={
        method:'get',
        url:'https://api.orange.com/sms/admin/v1/contracts',
        withCredentials:true,
        crossDomain:true,
        headers:{
            'Authorization': "Bearer "+token,
            'content-type': 'application/json'
        },
    };
    try{
        console.log("getting current balance");
      let result=await axios(getBalanceOptions); 
      console.dir(result.data.partnerContracts.contracts[0].serviceContracts[0].availableUnits);
      return result;
    }catch(err){
        console.log("error while getting balance");
        console.dir(err);   
    }
   }
}

function convertTimestampDate(timestamp:any) {
    var date = new Date(                          // Convert to date
      parseInt(                                   // Convert to integer
        timestamp.split("(")[1]                   // Take only the part right of the "("
      )
    );
    return [
      ("0" + date.getDate()).slice(-2),           // Get day and pad it with zeroes
      ("0" + (date.getMonth()+1)).slice(-2),      // Get month and pad it with zeroes
      date.getFullYear()                          // Get full year
    ].join('/');                                  // Glue the pieces together
  }
@Resolver(of => SmsProvider)
export class SmsProviderResolver {

    @Query(returns => SmsProvider, {nullable: true})
    async getCurrentApi() {
        const smsProviderRepository = getConnection("smsauto").getRepository(SmsProvider);
        let voila=await smsProviderRepository.findOne({
            where:{
                chosen:true
            }
        });
        
        let gettingIt=await getSmsBalance();
        voila!.unite=gettingIt.data.partnerContracts.contracts[0].serviceContracts[0].availableUnits;
        voila!.dateFin=gettingIt.data.partnerContracts.contracts[0].serviceContracts[0].expires;
        return voila?voila:null;

    }
    @Mutation(returns => Boolean)
    async addSmsProvider(@Arg("provider", type => String)provider: string) {
        const providerRepository = getConnection("smsauto").getRepository(SmsProvider);
        if(await providerRepository.findOne({where:{provider}})){
            //ORANGE EXISTE DEJA
            return false;
        }
        if(provider==="ORANGE"){
           
            let token;
            let str = "";
            const req={
                grant_type:'client_credentials'
            };
            
                str += "grant_type" + "=" + encodeURIComponent(req.grant_type);
            
            
            const getTokenOptions={
                method:'post',
                url:'https://api.orange.com/oauth/v2/token',
                withCredentials:true,
                crossDomain:true,
                headers:{
                    'Authorization': process.env.ORANGE_AUTH as string,
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data:str
            };
            try{
                token=await axios(getTokenOptions); 
            }catch(err){
                console.log(err);
            }
            if(token){
                console.log(convertTimestampDate(token.data.expires_in));
                
                await providerRepository.save({
                    provider,
                    token:token.data.access_token,
                    expirationToken:moment(moment(new Date()).add(token.data.expires_in,'seconds')).format("DD-MM-YYYY")
                });
            }
        }else{
            //mtn
            await providerRepository.save({
                provider,
            });
        }
        
        
        const voila = await providerRepository.findOne({
            where: {
                provider
            }
        });
        return voila?true:false;
    }
    @Mutation(returns => Boolean)
    async chooseSmsProvider(@Arg("provider", type => String)provider: string) {
        const providerRepository = getConnection("smsauto").getRepository(SmsProvider);
        
       let apis= await providerRepository.find({
       provider: Not(provider)
    });

    apis.map(async (e)=>{
       return await providerRepository.update({provider:e.provider},{chosen:false});
    });
        const voila = await providerRepository.update(
            {provider},
            {chosen:true}
        );
        if(voila)
        return true;
        else 
        return false;
    }
}