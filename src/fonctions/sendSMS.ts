import { request } from 'graphql-request';
import { getConnection, Like } from 'typeorm';
//import {TypeSMS} from '../entity/smsauto/TypeSMS';
import { parseString } from "xml2js";
import { HistoSMS } from "../entity/smsauto/HistoSMS";
//import * as scheduler from 'node-schedule';
import { SmsProvider } from "../entity/smsauto/SmsProvider";
//import * as casual from 'casual';
import { User } from "../entity/smsauto/User";
import { concatenateNumberSymtel, parseSymtelResponse } from "../utils/utils";
import { smsApiMTN, smsOCI, smsSymtel } from "./APISMS";
import { getSMS_anniverssaire } from "./getSMS_anniverssaire";
const moment = require("moment");
const Excel= require('exceljs');
const fs = require('fs');
const nodeoutlook = require('nodemailer');
let transporter = nodeoutlook.createTransport({
    host :process.env.SMTP_HOST,
    port :process.env.SMTP_PORT,
    secure : false , // true for 465, false for other ports
    auth:false,
    logger: true,
    debug: true,
    tls: {rejectUnauthorized: false},
});

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
    const histoRepository = getConnection("smsauto").getRepository(HistoSMS);
    let previousNo='';
    let localUser = await userRepository.findOne({username: "GESMS"});
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
        const createUserMutation=(username:string,password:string,direction:string)=>`mutation{
            addUser(username:"${username}",password:"${password}",direction:"${direction}"){
                id
                username
                textPassword
              }
        }`;
        const enCoursMutation=(de:string,encours:boolean)=>`mutation{
            setEnCours(de:"${de}",encours:${encours}){
                de
                encours
              }
        }`;
    const getApiQuery=()=>`query{
        getCurrentApi{
            id
            provider
            token
            expirationToken
            unite
            dateFin
          }
    }`;
    const publisherMutation=(message :string)=>`mutation{
        publisherMutation(message:"${message}")
    }`;
    if (typeSMS === "ANNIVERSAIRE") {
        /*let rejets : any = [];
        let envoiOk : any = [];*/
       /* const typeSmsRepository = await getConnection("smsauto").getRepository(TypeSMS);
        const theType = await typeSmsRepository.findOne({
            where: {
                type: "ANNIVERSAIRE",
                activated: true,
                launchedOnce: true
            }
        });*/
        
            const numberList = await getSMS_anniverssaire(); 
            let newlist=[{number:"59367811",sms:"sms anniversaire envoyés"}];
            console.dir(newlist);
            console.log(localUser);
            if(!localUser){
            //cree l'utilisateur GESMS
            localUser= await request(process.env.GRAPHQL_API as string, createUserMutation("GESMS","GESMS","SYSTEM"));

            }
            if(typeof numberList != "undefined" && typeof localUser !="undefined" ){
             let ok:Promise<SmsRapport>;
                let results;
                results=[];
                
                results=numberList/*newlist*/.map(async(e:any,i:any)=>{
                    if(previousNo==e.number){
                        return false;
                    }
                    let alreadySentToday=await histoRepository.findOne({to:e.number,dateEnvoi:Like(`${moment().format("YYYY-MM-DD")}`)});
                    
                    console.log("tour+"+i);
                    console.log('list number length '+newlist.length);
                    if(alreadySentToday){
                        console.log('already sent '+e.number);
                        return false;
                    }
                 let r=await traiTment(e,i,ok,"Nsia Vie CI",typeSMS,userRepository,localUser,histoMutation,publisherMutation,smsapi,numberList.length-1);
                    //console.dir(r);
                    previousNo=e.number;
                    return r; 
                });
                //console.dir(results);
               /* if(results.length){
                    scheduler.scheduledJobs['ANNIVERSAIRE'].cancel();
                }*/
                
                return results;
            }
        
       // console.log("sms lancer deja "+theType!.launchedOnce);
        return null;
    }else{
//single run only
        if(typeof smslist != "undefined" && typeof user !="undefined" ){
            let ok:any;
            //Envoi maintenant en cours
            let currentUser=await userRepository.findOne({id:user.id});
            await request(process.env.GRAPHQL_API as string, enCoursMutation(currentUser!.username,true));
            //let waitInterval=5000;
            //Here we verify that all sms sent are identical
            //if they are it will let us take advantage of symtel api batch processing
           let smsIsSame=smslist.map((e,i)=>{
               return e.sms;
           });
           let isTrulySame=smsIsSame.some((e,i)=>smsIsSame.indexOf(e)!=i);
           if(isTrulySame && smsapi!.provider==="SYMTEL" && process.env.SYMTEL_DEACTIVATE_500 as string!="yes"){
               //if all sms to send are identical and we use symtel
               console.log("tous les sms sont identiques et l'api utilisé est SYMTEL");
               //count the number of sms to send adn check wether it's over 500
               if(smslist.length<=500){
                    //proceed with the sending
                    //concatenation des numeros en chaine
                    let numString=concatenateNumberSymtel(smslist);
                    console.log("les sms symtel sont parti\n the number string is "+numString)
                 await request(process.env.GRAPHQL_API as string, enCoursMutation(currentUser!.username,true));
                let r=await traiTment(numString,"",ok,expeditor,typeSMS,userRepository,user,histoMutation,publisherMutation,smsapi,smslist.length-1,true,smslist,smslist[0].sms);
                //mail and report generation
                await request(process.env.GRAPHQL_API as string, enCoursMutation('',false));
                console.log("generation du rapport de mail");
                let recapEnvoi=await histoRepository.createQueryBuilder().where('"type" = :type AND "from"= :from AND CAST("dateEnvoi" AS DATE)= :date', { type:typeSMS,from:user.id,date:`%${moment().format("YYYY-MM-DD")}%` }).getMany();
                
                console.log(recapEnvoi.length);
                if(recapEnvoi.length>0){
                   
                    let workbook = new Excel.Workbook();
                    workbook.creator = 'GESMS';
                    workbook.lastModifiedBy = 'GESMS';
                    workbook.created = new Date();
                    workbook.modified = new Date();
                    workbook.lastPrinted = new Date();
                    workbook.properties.date1904 = true;
                    let sheet = workbook.addWorksheet(`RAPPORT ${typeSMS}`);
                    sheet.columns = [
                        { header: 'Type Envoi', key: 'type', width: 30,outlineLevel :1 },
                        { header: 'Destinataire', key: 'to', width: 30 ,outlineLevel :1},
                        { header: 'Expediteur', key: 'exp', width: 30 ,outlineLevel :1},
                        { header: 'sms', key: 'sms', width: 30 ,outlineLevel :1},
                        { header: 'Etat', key: 'status', width: 30 ,outlineLevel :1},
                        { header: 'NB SMS', key: 'nbsms', width: 30 ,outlineLevel :1},
                        { header: 'Date Envoi', key: 'dateEnvoi', width: 30,outlineLevel :1 },
                        { header: 'Operateur', key: 'op', width: 30,outlineLevel :1 },

                    ];
                    recapEnvoi.map((e,i,arr)=>{
                        sheet.addRow({type:e.type,to:e.to,exp:currentUser!.username,sms:e.message,status:e.isSent,nbsms:Math.round(e.message.length/160),dateEnvoi:e.dateEnvoi,op:e.provider});
                    });
                    if(currentUser!.username.includes('@')){
                        //on envoi un mail si l'utilisateur une adresse mail
                        let apiResult:any;
                         apiResult=await request(process.env.GRAPHQL_API as string, getApiQuery());
                        let filePath=`RAPPORT SMS ${typeSMS} du ${moment().format('DD-MM-YYYY')}.xlsx`;
                        console.log("fichier genere "+filePath);
                        //console.dir(apiResult);
                        workbook.xlsx.writeFile(filePath).then(async () => {

                            // envoi par mail
                            let info = await transporter.sendMail({
                               
                                from: process.env.SENDERMAIL,
                                to: currentUser!.username,
                                cc: process.env.CCMAIL,
                                bcc:process.env.BCCMAIL,
                                subject: filePath,
                                html: `<p>Bonjour cher utilisateur, <br/><br/>Veuillez trouver en pièce jointe le rapport de vos envois de sms effectués ce jour.<br/><br/>Le crédit actuel restant est de ${apiResult!.getCurrentApi!.unite} sms valide jusqu'au ${apiResult!.getCurrentApi!.dateFin.substring(0,10)}<br/><br/>${apiResult!.getCurrentApi!.unite<50000?'<b style="color:red;">Le stock de sms est bientot épuisé</b>':''} Cet email est auto généré.</p>`,
                                attachments: [
                                    {   // stream as an attachment
                                        filename: filePath,
                                        content: fs.createReadStream(filePath)
                                    }
                                ],
                                onError: (e:any) => console.log(e),
                                onSuccess: (i:any) => console.log(i)// html body
                            });
                           
                            console.log("rapport envoye par mail");
                            console.log('Message sent: %s', info.messageId);
                            const path = `./${filePath}`;

                            fs.unlink(path, (err:any) => {
                            if (err) {
                                console.error(err)
                                return
                            }
                        });
                    });         
                    }
                    //return results;
                }
                return r;
               }else{
                   //split the smslist into arrays of 500sms each and proceed with the sending
                   let numberIndex=Math.ceil(smslist.length/500);
                   let newSmsArray:any=[];
                   for (let i=0;i<numberIndex;i++){
                    if(i==0){
                        newSmsArray.push(smslist.slice(0,500));
                    }
                    else{
                        newSmsArray.push(smslist.slice(newSmsArray[0].length,(newSmsArray[0].length)+500));

                    }
                   }
                   let r;
                   r=newSmsArray.map(async(e:any,i:any)=>{
                       let o;
                            console.log(`longueur du ${++i} tableau des sms symtel est ${e.length}\n`);
                            //proceed with the sending
                            //concatenation des numeros en chaine
                            let numString=concatenateNumberSymtel(e);
                            console.log("les sms symtel sont parti\n the number string is "+numString)
                        await request(process.env.GRAPHQL_API as string, enCoursMutation(currentUser!.username,true));
                         o=await traiTment(numString,"",ok,expeditor,typeSMS,userRepository,user,histoMutation,publisherMutation,smsapi,e.length-1,true,e,smslist[0].sms);
                        //mail and report generation
                        await request(process.env.GRAPHQL_API as string, enCoursMutation('',false));
                        console.log("generation du rapport de mail");
                        let recapEnvoi=await histoRepository.createQueryBuilder().where('"type" = :type AND "from"= :from AND CAST("dateEnvoi" AS DATE)= :date', { type:typeSMS,from:user.id,date:`%${moment().format("YYYY-MM-DD")}%` }).getMany();
                        
                        console.log(recapEnvoi.length);
                        if(recapEnvoi.length>0){
                        
                            let workbook = new Excel.Workbook();
                            workbook.creator = 'GESMS';
                            workbook.lastModifiedBy = 'GESMS';
                            workbook.created = new Date();
                            workbook.modified = new Date();
                            workbook.lastPrinted = new Date();
                            workbook.properties.date1904 = true;
                            let sheet = workbook.addWorksheet(`RAPPORT ${typeSMS}`);
                            sheet.columns = [
                                { header: 'Type Envoi', key: 'type', width: 30,outlineLevel :1 },
                                { header: 'Destinataire', key: 'to', width: 30 ,outlineLevel :1},
                                { header: 'Expediteur', key: 'exp', width: 30 ,outlineLevel :1},
                                { header: 'sms', key: 'sms', width: 30 ,outlineLevel :1},
                                { header: 'Etat', key: 'status', width: 30 ,outlineLevel :1},
                                { header: 'NB SMS', key: 'nbsms', width: 30 ,outlineLevel :1},
                                { header: 'Date Envoi', key: 'dateEnvoi', width: 30,outlineLevel :1 },
                                { header: 'Operateur', key: 'op', width: 30,outlineLevel :1 },

                            ];
                            recapEnvoi.map((e,i,arr)=>{
                                sheet.addRow({type:e.type,to:e.to,exp:currentUser!.username,sms:e.message,status:e.isSent,nbsms:Math.round(e.message.length/160),dateEnvoi:e.dateEnvoi,op:e.provider});
                            });
                            if(currentUser!.username.includes('@')){
                                //on envoi un mail si l'utilisateur une adresse mail
                                let apiResult:any;
                                apiResult=await request(process.env.GRAPHQL_API as string, getApiQuery());
                                let filePath=`RAPPORT SMS ${typeSMS} du ${moment().format('DD-MM-YYYY')}.xlsx`;
                                console.log("fichier genere "+filePath);
                                //console.dir(apiResult);
                                workbook.xlsx.writeFile(filePath).then(async () => {

                                    // envoi par mail
                                    let info = await transporter.sendMail({
                                    
                                        from: process.env.SENDERMAIL,
                                        to: currentUser!.username,
                                        cc: process.env.CCMAIL,
                                        bcc:process.env.BCCMAIL,
                                        subject: filePath,
                                        html: `<p>Bonjour cher utilisateur, <br/><br/>Veuillez trouver en pièce jointe le rapport de vos envois de sms effectués ce jour.<br/><br/>Le crédit actuel restant est de ${apiResult!.getCurrentApi!.unite} sms valide jusqu'au ${apiResult!.getCurrentApi!.dateFin.substring(0,10)}<br/><br/>${apiResult!.getCurrentApi!.unite<50000?'<b style="color:red;">Le stock de sms est bientot épuisé</b>':''} Cet email est auto généré.</p>`,
                                        attachments: [
                                            {   // stream as an attachment
                                                filename: filePath,
                                                content: fs.createReadStream(filePath)
                                            }
                                        ],
                                        onError: (e:any) => console.log(e),
                                        onSuccess: (i:any) => console.log(i)// html body
                                    });
                                
                                    console.log("rapport envoye par mail");
                                    console.log('Message sent: %s', info.messageId);
                                    const path = `./${filePath}`;

                                    fs.unlink(path, (err:any) => {
                                    if (err) {
                                        console.error(err)
                                        return
                                    }
                                });
                            });         
                            }
                            //return results;
                        }
                   })
                   console.log("sms are more than 500");
                   return r;
               }
               return true;
           }
           ok=await smslist.map(async (e,i)=>{
              //await wait(waitInterval);
              await request(process.env.GRAPHQL_API as string, enCoursMutation(currentUser!.username,true));

                if(i<smslist.length )
                {

                    let r=await traiTment(e,i,ok,expeditor,typeSMS,userRepository,user,histoMutation,publisherMutation,smsapi,smslist.length-1);
                    if(i==smslist.length-1){
                        //mail and report generation
                        await request(process.env.GRAPHQL_API as string, enCoursMutation('',false));
                        console.log("generation du rapport de mail");
                        let recapEnvoi=await histoRepository.createQueryBuilder().where('"type" = :type AND "from"= :from AND CAST("dateEnvoi" AS DATE)= :date', { type:typeSMS,from:user.id,date:`%${moment().format("YYYY-MM-DD")}%` }).getMany();
                        
                        console.log(recapEnvoi.length);
                        if(recapEnvoi.length>0){
                           
                            let workbook = new Excel.Workbook();
                            workbook.creator = 'GESMS';
                            workbook.lastModifiedBy = 'GESMS';
                            workbook.created = new Date();
                            workbook.modified = new Date();
                            workbook.lastPrinted = new Date();
                            workbook.properties.date1904 = true;
                            let sheet = workbook.addWorksheet(`RAPPORT ${typeSMS}`);
                            sheet.columns = [
                                { header: 'Type Envoi', key: 'type', width: 30,outlineLevel :1 },
                                { header: 'Destinataire', key: 'to', width: 30 ,outlineLevel :1},
                                { header: 'Expediteur', key: 'exp', width: 30 ,outlineLevel :1},
                                { header: 'sms', key: 'sms', width: 30 ,outlineLevel :1},
                                { header: 'Etat', key: 'status', width: 30 ,outlineLevel :1},
                                { header: 'NB SMS', key: 'nbsms', width: 30 ,outlineLevel :1},
                                { header: 'Date Envoi', key: 'dateEnvoi', width: 30,outlineLevel :1 },
                                { header: 'Operateur', key: 'op', width: 30,outlineLevel :1 },

                            ];
                            recapEnvoi.map((e,i,arr)=>{
                                sheet.addRow({type:e.type,to:e.to,exp:currentUser!.username,sms:e.message,status:e.isSent,nbsms:Math.round(e.message.length/160),dateEnvoi:e.dateEnvoi,op:e.provider});
                            });
                            if(currentUser!.username.includes('@')){
                                //on envoi un mail si l'utilisateur une adresse mail
                                let apiResult:any;
                                 apiResult=await request(process.env.GRAPHQL_API as string, getApiQuery());
                                let filePath=`RAPPORT SMS ${typeSMS} du ${moment().format('DD-MM-YYYY')}.xlsx`;
                                console.log("fichier genere "+filePath);
                                //console.dir(apiResult);
                                workbook.xlsx.writeFile(filePath).then(async () => {

                                    // envoi par mail
                                    let info = await transporter.sendMail({
                                       
                                        from: process.env.SENDERMAIL,
                                        to: currentUser!.username,
                                        cc: process.env.CCMAIL,
                                        bcc:process.env.BCCMAIL,
                                        subject: filePath,
                                        html: `<p>Bonjour cher utilisateur, <br/><br/>Veuillez trouver en pièce jointe le rapport de vos envois de sms effectués ce jour.<br/><br/>Le crédit actuel restant est de ${apiResult!.getCurrentApi!.unite} sms valide jusqu'au ${apiResult!.getCurrentApi!.dateFin.substring(0,10)}<br/><br/>${apiResult!.getCurrentApi!.unite<50000?'<b style="color:red;">Le stock de sms est bientot épuisé</b>':''} Cet email est auto généré.</p>`,
                                        attachments: [
                                            {   // stream as an attachment
                                                filename: filePath,
                                                content: fs.createReadStream(filePath)
                                            }
                                        ],
                                        onError: (e:any) => console.log(e),
                                        onSuccess: (i:any) => console.log(i)// html body
                                    });
                                   
                                    console.log("rapport envoye par mail");
                                    console.log('Message sent: %s', info.messageId);
                                    const path = `./${filePath}`;

                                    fs.unlink(path, (err:any) => {
                                    if (err) {
                                        console.error(err)
                                        return
                                    }
                                });
                            });         
                            }
                            //return results;
                        }
                    }                    
                    return r;
                }
                return;
            });
            //Etablissement du rapport d'envoi
            return ok;
           
      // return null;
    }
};

async function traiTment(e:any,i:any,ok:any,expeditor:any,typeSMS:any,userRepository:any,user:any,histoMutation:any,publisherMutation:any,smsapi:any,lastindex:any,identical?:boolean,smsList?:any,staticSMS?:string){
    const providerRepository = getConnection("smsauto").getRepository(SmsProvider);
    let dbtoken=await providerRepository.findOne({where:{
        provider:'ORANGE'
    }});
    console.log(`API ${smsapi.provider} utiliser pour les envois`);
    if(identical && smsList.length && staticSMS){
        //the sms are identical and we use symtel api and we send in the array of numbers
        let p=new Promise((resolve,reject)=>{
            setTimeout(async ()=>{
                console.log("contents of e is");
                console.dir(e);
                //console.dir(e.sms);
                console.log("reponse en json reel");
                let heureEnvoi= moment().format("HH:mm");
                let res:any;
                //envoi de 500sms minimum
                res=await smsSymtel(e,smsList,staticSMS,expeditor,{type:typeSMS,appId:user.id,qui:user.direction,message:staticSMS});
                //process the string returned with a function that returns an array
                //if res != of all errors
                if(res!="INTERNAL SERVER ERROR" && res!="AUTHENTICATION FAILED" && res!="SEND SMS DENIED" && res!="FROM DENIED"){
                    let resArr:any;
                    console.dir(res.data)
                    resArr=parseSymtelResponse(res.data);
                    console.log("tableau des numero issu du split symtel:\n");
                    console.dir(resArr);
                    //archivage in the db
                    resArr.forEach((e:any) => {
                        ok= new Promise(async(resolve,reject)=>{
                            const args = {
                                type: typeSMS,
                                appId: user.id,
                                qui: user.direction,
                                message: staticSMS,
                                to: e.number,
                                provider:smsapi.provider,
                                transactionId: e.status,
                                isSent: true
                            };
                           await request(process.env.GRAPHQL_API as string, histoMutation(args.type, args.appId, args.qui, args.message, args.to, args.provider,args.transactionId, args.isSent));
                           const doPub=await request(process.env.GRAPHQL_API as string,publisherMutation(`envoi au ${e.number} effectué`));
                           console.log(`envoi au ${e.number} effectué publication ${doPub}`);
                           
                                resolve({
                                    sender:user.username,
                                    number:e.number,
                                    sms:staticSMS,
                                    heure_envoi:heureEnvoi,
                                    status:true
                                });
                            });
                           resolve(ok);
                    });
                }else{
                    resolve();
                }
                
            });
        });
        return p;
    }
    console.log(`i is ${i} and lastindex is ${lastindex}`);
    if(i<=lastindex){
        if(typeSMS==='test'/*||typeSMS==='ANNIVERSAIRE'*/){
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
                  },i*10);
             });
              return p;
        }else{
            //debut du bon algo
            const theuser = await userRepository.findOne({id:user.id});
            let p=new Promise((resolve,reject)=>{
                setTimeout(async ()=>{
                    console.log("contents of e is");
                    console.dir(e);
                    //console.dir(e.sms);
                    console.log("reponse en json reel");
                    let heureEnvoi= moment().format("HH:mm");
                    let res:any;
                    if(e.number.length<8 || e.number.length>8 || e.number=="00000000" || e.number=="01010101"|| isNaN(parseInt(e.number))){
                    }else{
                        res = smsapi.provider==="MTN"?await smsApiMTN(expeditor?expeditor:"NSIA VIE CI", moment().format("YYYYMMDDHHmmss"), false, false, false, [e.number], e.sms):
                        await smsOCI(e.number,e.sms,dbtoken,{type:typeSMS,appId:user.id,qui:user.direction,message:e.sms},expeditor);
                    }
                     
                    console.log("res is:");
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
                                        message: e.sms+" | "+Math.round(e.sms.length/160),
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
                        if(typeof res!='undefined' && !res.hasOwnProperty('requestError')){
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
                               console.log(`envoi au ${e.number} effectué publication ${doPub}`);
                               
                                    resolve({
                                        sender:theuser.username,
                                        number:e.number,
                                        sms:e.sms,
                                        heure_envoi:heureEnvoi,
                                        status:true
                                    });
                                });
                               resolve(ok);
                        }else{
                            console.log(`l'envoi de ce sms a echouer ${e.number}`);
                            const args = {
                                type: typeSMS,
                                appId: user.id,
                                qui: user.direction,
                                message: e.sms,
                                to: e.number,
                                provider:smsapi.provider,
                                transactionId: "Echec de l'envoi",
                                isSent: false
                            };
                            await request(process.env.GRAPHQL_API as string, histoMutation(args.type, args.appId, args.qui, args.message, args.to, args.provider,args.transactionId, args.isSent));

                            resolve({
                                sender:theuser.username,
                                number:e.number,
                                sms:e.sms,
                                heure_envoi:heureEnvoi,
                                status:false
                            });;
                        }
                        
                    }
                  },10);//voyons voir
             });
             console.log("contenu de P");
             console.dir(p); 
             return p;
        }
    }
    
    return true;
}
}