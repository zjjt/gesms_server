import * as express from 'express';
import {User} from '../entity/smsauto/User';
import {getConnection} from 'typeorm';
//import { SmsRapport } from '../entity/smsauto/SmsRapport';
import { sendSMS } from '../fonctions/sendSMS';



export const apiRouter = express.Router();
export let SESSION:any;
apiRouter.get('/',(req,res) => {
   SESSION=req.session;
});
apiRouter
    .route('/sendSMS')
    .post(async(req, res) => {
        /*username string
        password string
        telephone string
        expeditor string
        typeEnvoi string
        sms [{number:59367811,sms:"test test"}]
        */
        const {username,password,telephone,expeditor,typeEnvoi,sms,smsArray} = req.body;
        const userRepository = getConnection("smsauto").getRepository(User);
        if(username && password && telephone && expeditor && typeEnvoi && sms){
            const user=await userRepository.findOne({username});
            //const isValidPassword = await bcrypt.compare(password, user!.password);
            const isValidPassword=password===user!.textPassword?true:false;
            if(!user||!isValidPassword){
                res.status(400).json({error:"authentication failed"});
            }else if(telephone &&(!/^\d+$/.test(telephone)|| telephone.length<8)){
                res.status(400).json({error:"wrong phone number entered"});
            }else{
                
                let composition=null;
                let expeditorArray=['Nsia Vie CI','MoovEpargne','MoovSoutien','DiamondBank','AssistEtude','NovaPension','EpargnePlus','Ecopension','UBA Ep Pro','CapitalBonu','Pierre Plus','BHCI Compas'];
                if(expeditorArray.includes(expeditor)){
                    if(!smsArray)
                    composition={sms,number:telephone};
                       let r= await sendSMS(typeEnvoi,undefined,{id:user.id,direction:user.direction},composition?[composition]:smsArray,expeditor);
                       console.log(r);
                       res.status(200).json({result:"Envoi effectue"});
                       
                }else{
                    res.status(400).json({error:"une erreur est survenue lors de l'envoi, veuillez reverifier les parametres utilisés"});

                }
               
                
                
            }
        }else{
            res.status(500).json({error:"please fill out the body of the request"});
        }
         

    })