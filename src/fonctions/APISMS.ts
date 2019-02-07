const URL = require('url');
const axios = require('axios')

export const smsApi = async(originator : string, defDate : string, blink : boolean, flash : boolean, privat : boolean, numbers : string[], sms : string) => {

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
    let url = URL.parse(`http://smspro.mtn.ci/bms/Soap/Messenger.asmx/HTTP_SendSms?customerID=4095&userName=AMACOU&userPassword=Password001&originator=${originator}&messageType=ArabicWithLatinNumbers&defDate=${defDate}&blink=${blink}&flash=${flash}&Private=${privat}&recipientPhone=${numberString}&smsText=${encodeURIComponent(sms)}`);
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