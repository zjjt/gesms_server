import { getConnection } from "typeorm";
import { SmsProvider } from "../entity/smsauto/SmsProvider";
//import { HistoSMS } from "../entity/smsauto/HistoSMS";
import {request} from 'graphql-request';
const moment = require("moment");
//import * as qs from 'qs';

const URL = require('url');
const axios = require('axios');
const histoMutation = (type : string, appId : string, qui : string, message : string, to : string,provider:string, tid : string, isSent : boolean) => `mutation{
    addHistoSMS(data:{type:"${type}",appId:"${appId}",qui:"${qui}",message:"""${message}""",to:"${to}",provider:"${provider}",transactionId:"${tid}",isSent:${isSent}}){
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
export const smsApiMTN = async(originator : string, defDate : string, blink : boolean, flash : boolean, privat : boolean, numbers : string[], sms : string) => {

    let numberString : string = "";
    numbers.map((e, i, arr) => {
        if (i === 0) {
            numberString = e
        } else {
            numberString.concat("," + e)
        }
        if (i === 99) {
            return;
        }
    })
    console.log("numberString " + numberString);
    let result;
    let url = URL.parse(`http://smspro.mtn.ci/bms/Soap/Messenger.asmx/HTTP_SendSms?customerID=4095&userName=${process.env.MTN_USER}&userPassword=${process.env.MTN_PASSWORD}&originator=${originator}&messageType=ArabicWithLatinNumbers&defDate=${defDate}&blink=${blink}&flash=${flash}&Private=${privat}&recipientPhone=${numberString}&smsText=${encodeURIComponent(sms)}`);
    if (process.env.NODE_ENV != "production") {
        
        console.log("sending one sms");
        console.log(url.href);
       
        try {
            result = await axios({
                method:'get',
                url:url.href,
                timeout:60*15*1000
            });
        } catch (err) {
            console.error(err);
        }
     } else {
        /*result = await request
            .get(url.href)
            .on('response', (response : any) => {
                console.log("sms sent");
                console.log(response.statusCode + " " + response.statusMessage)
                return {statusCode: response.statusCode, message: response.statusMessage}
            })*/
    }
    return await result;
}

//SYMTEL API
export const smsSymtel=async(numbers:string,numArray:any,sms:string,from:string,details:any)=>{
    //sending the sms
    //numArray parameter will be greater than one only if no dynamic sms is sent
    let result;
    try{
        console.log("---------------------||SYMTEL API||----------------------");
        //console.log(dbtoken.token);
        result = await axios.get(`https://mmg3.symtel.biz:8443/AMMG/SymtelMMG?username=${process.env.SYMTEL_USERNAME}&passw
        ord=${process.env.SYMTEL_PASSWORD}&from=${from}&to=${numbers}&dlrmask=31&text=${sms}
        `);
    }catch(err){
        console.error("Une erreur critique a eu lieu lors de l'envoi");
        numArray.map(async(e:any,i:any)=>{
            await request(process.env.GRAPHQL_API as string, histoMutation(details.type, details.appId, details.qui, details.message, e, "SYMTEL","echec", false));
        });
        console.error(err);
    }
    return await result;
};


//ORANGE API
export const smsOCI=async(number:string,sms:string,dbtoken:any,details:any,expeditor?:string)=>{
    //prefixer les numeros par +225 
    
    number="tel:+225"+number;
    
    //get token from orange CI if token doesnt exist yet
    const providerRepository = getConnection("smsauto").getRepository(SmsProvider);
    //check in db if token exists

    //si la date d'expiration du token eest passee ou le token n'existe pas mm
if(!dbtoken/*||moment(new Date()).isAfter(dbtoken!.expirationToken)*/){
        //recreer le token et MAJ
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
            console.dir(err);
            
        }
        if(token){
           // console.dir(token);
            dbtoken.token=token.data.access_token;
            await providerRepository.update(
                {
                    provider:"ORANGE"
                },
                {
                token:token.data.access_token,
                expirationToken:moment(token.data.expires_in).format("DD-MM-YYYY")
            });
        }
    }
    //sending the sms
    let options={
        outboundSMSMessageRequest:{
            address:number,
            senderAddress:`tel:+225${process.env.ORANGE_SENDER}`,
            senderName:expeditor,
            outboundSMSTextMessage:{
                message: sms
            }
        }
    };
    let result;
    let url=`https://api.orange.com/smsmessaging/v1/outbound/tel%3A%2B225${process.env.ORANGE_SENDER}/requests`;
    try {
        console.log("---------------------||ORANGE API||----------------------");
        //console.log(dbtoken.token);
        result = await axios({
            method:'post',
            //withCredentials:true,
           // crossDomain:true,
            url:url,
            headers:{
                'Authorization': `Bearer ${dbtoken.token}`,
                'Content-type': 'application/json'
            },
            data:options
        });
    } catch (err) {
        //console.dir(err);
        //result=err.response.data;
        console.error("Une erreur critique a eu lieu lors de l'envoi");
        let newtel=number.substring(8);
        await request(process.env.GRAPHQL_API as string, histoMutation(details.type, details.appId, details.qui, details.message, newtel, "ORANGE","echec", false));

        console.error(err);
    }
    return await result;

};