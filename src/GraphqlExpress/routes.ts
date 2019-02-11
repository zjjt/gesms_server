import * as express from 'express';
/*import {User} from '../entity/smsauto/User';
import {getConnection} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { SmsRapport } from '../entity/smsauto/SmsRapport';*/



export const apiRouter = express.Router();

apiRouter
    .route('/sendSMS')
    .post(async(req, res) => {
       /* const {username,password,telephone,expeditor,typeEnvoi,sms} = req.body;
        const userRepository = getConnection("smsauto").getRepository(User);
        if(username && password && telephone && expeditor && typeEnvoi && sms){
            const user=await userRepository.findOne({username});
            //const isValidPassword = await bcrypt.compare(password, user!.password);
            const isValidPassword=password===user!.textPassword?true:false;
            if(!user||!isValidPassword){
                res.status(400).json({error:"authentication failed"});
            }else if(!/^\d+$/.test(telephone)|| telephone.length<8){
                res.status(500).json({error:"wrong phone number entered"});
            }else{
                let ok:Promise<SmsRapport>;
                let results;
                                
                //console.dir(results);
                return results;
            }
        }else{
            res.status(500).json({error:"please fill out the body of the request"});
        }*/
         

    })