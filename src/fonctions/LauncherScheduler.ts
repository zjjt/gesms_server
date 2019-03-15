import {sendSMS} from './sendSMS';
import {getConnection, Not} from 'typeorm';
import {TypeSMS} from '../entity/smsauto/TypeSMS';
import * as scheduler from 'node-schedule';
import { SmsProvider } from '../entity/smsauto/SmsProvider';
import moment = require('moment');
const axios = require('axios');

export const Launcher = async() => {
    let providerRepository=await getConnection("smsauto").getRepository(SmsProvider);
    if(!await providerRepository.findOne({where:{provider:"ORANGE"}})){
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
                //console.log(convertTimestampDate(token.data.expires_in));
                
                await providerRepository.save({
                    provider:"ORANGE",
                    token:token.data.access_token,
                    expirationToken:moment(moment(new Date()).add(token.data.expires_in,'seconds')).format("DD-MM-YYYY")
                });
            }
    }
    if(!await providerRepository.findOne({where:{provider:"MTN"}})){
        await providerRepository.save({
            provider:"MTN",
        }); 
    }
    let smsJobs : any = [];
    const typeSmsRepository = await getConnection("smsauto").getRepository(TypeSMS);
    const allTypes = await typeSmsRepository.find({
        where: {
            activated: true,
            timeOfLaunch: Not("NOT_SET_YET"),
            launchedOnce: false
        }
    });
    if (allTypes.length) {
        console.log("allTypes length: " + allTypes.length);

        allTypes.map((e : TypeSMS, i : number, r : TypeSMS[]) => {
            switch (e.type) {
                case "ANNIVERSAIRE":
                    console.log("smstype: " + e.type);
                    const thisJob = scheduler.scheduledJobs[`${e.type}`];
                    if (thisJob) {
                        break;
                    } else {
                        const j = scheduler.scheduleJob(e.type, e.timeOfLaunch, async() => {
                            await sendSMS("ANNIVERSAIRE");
                            await typeSmsRepository.update(e.id, {launchedOnce: true});
                        });
                        smsJobs.push(j);
                        console.log("set up SMS ANNIF done");
                        break;
                    }

                default:
                    //genere le job custom ici
                    break;
            }
        });
    }

}