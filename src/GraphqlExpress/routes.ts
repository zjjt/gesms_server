import * as express from 'express';
import {User} from '../entity/smsauto/User';
import { findValuesAddedToEnums } from 'graphql/utilities/findBreakingChanges';
import {getConnection} from 'typeorm';
import * as bcrypt from 'bcryptjs';



export const apiRouter = express.Router();

apiRouter
    .route('/sendSMS')
    .post(async(req, res) => {
        const {username,password,telephone,expeditor,typeEnvoi,sms} = req.body;
        const userRepository = getConnection("smsauto").getRepository(User);
        if(username && password && telephone && expeditor && typeEnvoi && sms){
            const user=await userRepository.findOne()
        }else{
            res.json();
        }
         

    })