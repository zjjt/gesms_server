import {getSMS_anniverssaire} from "./getSMS_anniverssaire";
import {smsApiMTN, smsOCI} from "./APISMS";
const moment = require("moment");
//import * as casual from 'casual';
import {getConnection} from "typeorm";
import {User} from "../entity/smsauto/User";
import {parseString} from "xml2js";
import {request} from 'graphql-request';
import { SmsProvider } from "../entity/smsauto/SmsProvider";
//import { wait } from "../utils/utils";
//import {request} from 'graphql-request'; const axios = require('axios');
export interface smsuser{
    id:string,
    direction:string
};

export interface smsArray{
    sms:string,
    number:string
};
export interface SmsRapport {
    sender:string
    number : string,
    sms : string,
    heure_envoi:string,
    status:boolean
}
export const sendSMS = async(typeSMS : string, text
    ?
    : string,user?:smsuser,smslist?:smsArray[],expeditor?:string) => {
        const providerRepository = getConnection("smsauto").getRepository(SmsProvider);
        const smsapi=await providerRepository.findOne({
            where:{
                chosen:true
            }
        });
    const userRepository = getConnection("smsauto").getRepository(User);
    let localUser = await userRepository.findOne({username: "GESMS"});
    const histoMutation = (type : string, appId : string, qui : string, message : string, to : string,provider:string, tid : string, isSent : boolean) => `mutation{
            addHistoSMS(data:{type:"${type}",appId:"${appId}",qui:"${qui}",message:"${message}",to:"${to}",provider:"${provider}",transactionId:"${tid}",isSent:${isSent}}){
                id
                type
                from
                auBudgetDeLa
                message
                to
                provider
                transactionID_API
                isSent
                dateEnvoi
            }
        }`;
        const createUserMutation=(username:string,password:string,direction:string)=>`mutation{
            addUser(username:"${username}",password:"${password}",direction:"${direction}"){
                id
                username
                textPassword
              }
        }`;
    const publisherMutation=(message :string)=>`mutation{
        publisherMutation(message:"${message}")
    }`;
    if (typeSMS === "ANNIVERSAIRE") {
        /*let rejets : any = [];
        let envoiOk : any = [];*/
        const numberList = await getSMS_anniverssaire(); 
        console.dir(numberList);
        console.log(localUser);
        if(!localUser){
           //cree l'utilisateur GESMS
           localUser= await request(process.env.GRAPHQL_API as string, createUserMutation("GESMS","GESMS","SYSTEM"));

        }
        if(typeof numberList != "undefined" && typeof localUser !="undefined" ){
            let ok:Promise<SmsRapport>;
            let results;
            results=[];
            results=numberList.map(async(e:any,i:any)=>{
                let r=await traiTment(e,i,ok,expeditor,typeSMS,userRepository,localUser,histoMutation,publisherMutation,smsapi);
                console.dir(r);
                return r; 
            });
            console.dir(results);
            return results;
        }
        return null;
    }else{
//single run only
        if(typeof smslist != "undefined" && typeof user !="undefined" ){
            let ok:Promise<SmsRapport>;
            let results;
            results=[];
            //let waitInterval=5000;
            results=smslist.map(async (e,i)=>{
              //await wait(waitInterval);
                if(i<smslist.length)
                {
                    let r=await traiTment(e,i,ok,expeditor,typeSMS,userRepository,user,histoMutation,publisherMutation,smsapi);
                    console.dir(r);
                    return r;
                }
                return;
            });
           
            console.dir(results);
            return results;
        }
       return null;
    }
};

async function traiTment(e:any,i:any,ok:any,expeditor:any,typeSMS:any,userRepository:any,user:any,histoMutation:any,publisherMutation:any,smsapi:any){
    const providerRepository = getConnection("smsauto").getRepository(SmsProvider);
    let dbtoken=await providerRepository.findOne({where:{
        provider:'ORANGE'
    }});
    console.log(`API ${smsapi.provider} utiliser pour les envois`);
    if(typeSMS==='test'||typeSMS==='ANNIVERSAIRE'){
        let p=new Promise((resolve,reject)=>{
            setTimeout(async ()=>{
                let mock = smsapi.provider==="MTN"?{
                    data: `<?xml version="1.0" encoding="utf-8"?>
                <SendResult xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmnls="http://pmmsoapmessenger.com/">
                    <Result>OK</Result>
                    <RejectedNumbers/>
                    <TransactionID>f4ae9f50-4c08-4a72-b4d8-0ff9f795268f</TransactionID>
                    <NetPoints>POSTPAID</NetPoints>
                </SendResult>`
                }:{

                };
                console.dir(e.sms);
                console.log("reponse en json");
                let heureEnvoi= moment().format("HH:mm");
                //let res = await smsApi(expeditor?expeditor:"NSIA VIE CI", moment().format("YYYYMMDDHHmmss"), false, false, false, [e.number], e.sms);
                
                //console.dir(res);
                /*const retour = {
                    statusCode: res.status,
                    statusRequete: res.statusText
                };*/
                if (/*retour.statusCode == 200 && retour.statusRequete == 'OK'*/true) {
                    ok= new Promise((resolve,reject)=>{
                        parseString(mock/*res.data*/, async(err, r) => {
    
                            console.log("retours parsed");
                            console.dir(r);
                           // console.log(process.env.GRAPHQL_API);
                            const args = {
                                type: typeSMS,
                                appId: user.id,
                                qui: user.direction,
                                message: e.sms,
                                to: e.number,
                                provider:smsapi.provider,
                                transactionId: 'test',//r.SendResult.TransactionID,
                                isSent: true
                            };
                           const result = await request(process.env.GRAPHQL_API as string, histoMutation(args.type, args.appId, args.qui, args.message, args.to,args.provider, args.transactionId, args.isSent));
    
                            console.log("retour historisation normale");
                            console.log(result);
                            //console.dir(retour);
                            const theuser = await userRepository.findOne({id:user.id});
                            const doPub=await request(process.env.GRAPHQL_API as string,publisherMutation(`envoi au ${e.number} effectué`));
                            console.log(doPub);
                            resolve({
                                sender:theuser!.username,
                                number:e.number,
                                sms:e.sms,
                                heure_envoi:heureEnvoi,
                                status:true
                            });
                        
                    });
                });
                resolve(ok);
                
                }else{
                    const theuser = await userRepository.findOne({id:user.id});
                    resolve({
                        sender:theuser!.username,
                        number:e.number,
                        sms:e.sms,
                        heure_envoi:heureEnvoi,
                        status:false
                    });;
                }
              },i*1000);
         });
          return p;
    }else{
        const theuser = await userRepository.findOne({id:user.id});
        let p=new Promise((resolve,reject)=>{
            setTimeout(async ()=>{
                console.dir(e.sms);
                console.log("reponse en json reel");
                let heureEnvoi= moment().format("HH:mm");
                let res = smsapi.provider==="MTN"?await smsApiMTN(expeditor?expeditor:"NSIA VIE CI", moment().format("YYYYMMDDHHmmss"), false, false, false, [e.number], e.sms):
                    await smsOCI(e.number,e.sms,dbtoken);
                
                console.dir(res);
                if(smsapi.provider==="MTN"){
                    const retour = {
                        statusCode: res.status,
                        statusRequete: res.statusText
                    };
                    if (retour.statusCode == 200 && retour.statusRequete == 'OK') {
                        ok= new Promise((resolve,reject)=>{
                            parseString(res.data, async(err, r) => {
        
                                console.log("retours parsed");
                                //console.dir(r);
                               // console.log(process.env.GRAPHQL_API);
                                const args = {
                                    type: typeSMS,
                                    appId: user.id,
                                    qui: user.direction,
                                    message: e.sms,
                                    to: e.number,
                                    provider:smsapi.provider,
                                    transactionId: r.SendResult.TransactionID,
                                    isSent: true
                                };
                               const result = await request(process.env.GRAPHQL_API as string, histoMutation(args.type, args.appId, args.qui, args.message, args.to, args.provider,args.transactionId, args.isSent));
        
                                console.log("retour historisation normale");
                                console.log(result);
                                console.dir(retour);
                                const theuser = await userRepository.findOne({id:user.id});
                                const doPub=await request(process.env.GRAPHQL_API as string,publisherMutation(`envoi au ${e.number} effectué`));
                                console.log(doPub);
                                resolve({
                                    sender:theuser!.username,
                                    number:e.number,
                                    sms:e.sms,
                                    heure_envoi:heureEnvoi,
                                    status:true
                                });
                            
                        });
                    });
                    resolve(ok);
                    
                    }else{
                        const theuser = await userRepository.findOne({id:user.id});
                        resolve({
                            sender:theuser!.username,
                            number:e.number,
                            sms:e.sms,
                            heure_envoi:heureEnvoi,
                            status:false
                        });;
                    }
                }else if(smsapi.provider==="ORANGE"){
                    ok= new Promise(async(resolve,reject)=>{
                    const args = {
                        type: typeSMS,
                        appId: user.id,
                        qui: user.direction,
                        message: e.sms,
                        to: e.number,
                        provider:smsapi.provider,
                        transactionId: "Envoyé à l'API d'orange",
                        isSent: true
                    };
                   await request(process.env.GRAPHQL_API as string, histoMutation(args.type, args.appId, args.qui, args.message, args.to, args.provider,args.transactionId, args.isSent));
                   const doPub=await request(process.env.GRAPHQL_API as string,publisherMutation(`envoi au ${e.number} effectué`));
                   console.log(doPub);
                   
                        resolve({
                            sender:theuser.username,
                            number:e.number,
                            sms:e.sms,
                            heure_envoi:heureEnvoi,
                            status:true
                        });
                    });
                   resolve(ok);
                }
              },i*12000);
         });
          return p;
    }
    return true;
}