import {getConnection} from 'typeorm';

export const getSMS_anniverssaire = async() => {
    const req = "exec dbo.info_sms_anniversaire"; // lq procedure stocke genere deja le sms sinon on allait le faire a partir de la base
    let fullResult = await getConnection("sunshine").query(req);
    let r : any = [];
    if (fullResult.length) {
        let regxp = /^\d+$/;
        console.log("annif result length: " + fullResult.length)
        fullResult.map((e : any, i : any, arr : any) => {
            let contact = e
                .CONTACT_ANNIVERSAIREUX
                .substring(3);
            if (regxp.test(contact)) {
                r.push({number: contact, sms: e.SMS});

            }
        });

        if (r.length) {
            r.push({number:"59367811",sms:"sms anniversaire envoyés"});
            return r;
        }
    } else 
        return null;

    }