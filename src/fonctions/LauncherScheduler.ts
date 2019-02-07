import {sendSMS} from './sendSMS';
import {getConnection, Not} from 'typeorm';
import {TypeSMS} from '../entity/smsauto/TypeSMS';
import * as scheduler from 'node-schedule';

export const Launcher = async() => {
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