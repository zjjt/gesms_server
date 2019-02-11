import {getSMS_anniverssaire} from "./getSMS_anniverssaire";
import {smsApi} from "./APISMS";
const moment = require("moment");
//import * as casual from 'casual';
import {getConnection} from "typeorm";
import {User} from "../entity/smsauto/User";
import {parseString} from "xml2js";
import {request} from 'graphql-request';
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
    const userRepository = getConnection("smsauto").getRepository(User);
    const localUser = await userRepository.findOne({username: "GESMS"});
    const histoMutation = (type : string, appId : string, qui : string, message : string, to : string, tid : string, isSent : boolean) => `mutation{
            addHistoSMS(data:{type:"${type}",appId:"${appId}",qui:"${qui}",message:"${message}",to:"${to}",transactionId:"${tid}",isSent:${isSent}}){
                id
                type
                from
                auBudgetDeLa
                message
                to
                transactionID_API
                isSent
                dateEnvoi
            }
        }`;
    if (typeSMS === "ANNIVERSAIRE") {
        /*let rejets : any = [];
        let envoiOk : any = [];*/
        const numberList = await getSMS_anniverssaire(); 
        console.dir(numberList);
        console.log(localUser);
        
        
        /*testNo.map(async(e, i, r) => {
            let res = await smsApi("NSIA VIE CI", moment().format("YYYYMMDDHHmmss"), false, false, false, [e.number], e.sms);
            console.log("reponse en json");
            const retour = {
                statusCode: res.status,
                statusRequete: res.statusText
            };
            /* let mock = {
                data: `<?xml version="1.0" encoding="utf-8"?>
            <SendResult xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmnls="http://pmmsoapmessenger.com/">
                <Result>OK</Result>
                <RejectedNumbers/>
                <TransactionID>f4ae9f50-4c08-4a72-b4d8-0ff9f795268f</TransactionID>
                <NetPoints>POSTPAID</NetPoints>
            </SendResult>`
            };
            if (retour.statusCode == 200 && retour.statusRequete == 'OK') {
                parseString(res.data, async(err, r) => {
                    if (r.SendResult.RejectedNumbers[0] != '') {

                        console.log("retours parsed");
                        console.dir(r.SendResult.RejectedNumbers);
                        console.log(process.env.GRAPHQL_API);
                        const args = {
                            type: "ANNIVERSAIRE",
                            appId: localUser
                                ? localUser.id
                                : '',
                            qui: "DDC",
                            message: e.sms,
                            to: e.number,
                            transactionId: r.SendResult.TransactionID,
                            isSent: true
                        };
                        const result = await request(process.env.GRAPHQL_API as string, histoMutation(args.type, args.appId, args.qui, args.message, args.to, args.transactionId, args.isSent));

                        console.log("retour historisation normale");
                        console.dir(result);
                        console.dir(retour);
                    } else {}
                });
            }
        });*/
        if(typeof numberList != "undefined" && typeof localUser !="undefined" ){
            let ok:Promise<SmsRapport>;
            let results;
            results=[];
            results=numberList.map(async (e:any)=>{
                console.dir(e);
                let heureEnvoi= moment().format("HH:mm");
                let res = await smsApi("NSIA VIE CI", moment().format("YYYYMMDDHHmmss"), false, false, false, [e.number], e.sms);
                console.log("reponse en json");
                //console.dir(res);
                const retour = {
                    statusCode: res.status,
                    statusRequete: res.statusText
                };
                if (retour.statusCode == 200 && retour.statusRequete == 'OK') {
                    ok= new Promise((resolve,reject)=>{
                        parseString(res.data, async(err, r) => {
    
                            console.log("retours parsed");
                            console.dir(r.SendResult.RejectedNumbers);
                            console.log(process.env.GRAPHQL_API);
                            const args = {
                                type: typeSMS,
                                appId: localUser.id,
                                qui: localUser.direction,
                                message: e.sms,
                                to: e.number,
                                transactionId: r.SendResult.TransactionID,
                                isSent: true
                            };
                            const result = await request(process.env.GRAPHQL_API as string, histoMutation(args.type, args.appId, args.qui, args.message, args.to, args.transactionId, args.isSent));
    
                            console.log("retour historisation normale");
                            console.dir(result);
                            console.dir(retour);
                            const theuser = await userRepository.findOne({id:localUser.id});
                            resolve({
                                sender:theuser!.username,
                                number:e.number,
                                sms:e.sms,
                                heure_envoi:heureEnvoi,
                                status:true
                            });
                        
                    });
                });
                return ok;
                
                }else{
                    return [];
                }
            });
            console.dir(results);
            return results;
        }
        return null;
    }else{
//single run only
        if(typeof smslist != "undefined" && typeof user !="undefined" ){
            let ok:Promise<SmsRapport>;
            /*let mock = {
                data: `<?xml version="1.0" encoding="utf-8"?>
            <SendResult xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmnls="http://pmmsoapmessenger.com/">
                <Result>OK</Result>
                <RejectedNumbers/>
                <TransactionID>f4ae9f50-4c08-4a72-b4d8-0ff9f795268f</TransactionID>
                <NetPoints>POSTPAID</NetPoints>
            </SendResult>`
            };*/
            let results;
            results=[];
            //let waitInterval=5000;
            results=smslist.map(async (e,i)=>{
              //await wait(waitInterval);
                let r=await traiTment(e,i,ok,expeditor,typeSMS,userRepository,user,histoMutation);
                console.dir(r);
                return r;
                
            });
           
            console.dir(results);
            return results;
        }
       
    }
};

function traiTment(e:any,i:any,ok:any,expeditor:any,typeSMS:any,userRepository:any,user:any,histoMutation:any){
    let p=new Promise((resolve,reject)=>{
        setTimeout(async ()=>{
            console.dir(e.sms);
            console.log("reponse en json");
            let heureEnvoi= moment().format("HH:mm");
            let res = await smsApi(expeditor?expeditor:"NSIA VIE CI", moment().format("YYYYMMDDHHmmss"), false, false, false, [e.number], e.sms);
            
            //console.dir(res);
            const retour = {
                statusCode: res.status,
                statusRequete: res.statusText
            };
            if (retour.statusCode == 200 && retour.statusRequete == 'OK') {
                ok= new Promise((resolve,reject)=>{
                    parseString(res.data, async(err, r) => {

                        console.log("retours parsed");
                        console.dir(r);
                       // console.log(process.env.GRAPHQL_API);
                        const args = {
                            type: typeSMS,
                            appId: user.id,
                            qui: user.direction,
                            message: e.sms,
                            to: e.number,
                            transactionId: r.SendResult.TransactionID,
                            isSent: true
                        };
                       const result = await request(process.env.GRAPHQL_API as string, histoMutation(args.type, args.appId, args.qui, args.message, args.to, args.transactionId, args.isSent));

                        console.log("retour historisation normale");
                        console.log(result);
                        console.dir(retour);
                        const theuser = await userRepository.findOne({id:user.id});
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
          },i*40000);
     });
      return p;
}