import {parseString} from 'xml2js';
export interface MTNAPIRESPONSE {
    SendResult : {}
}

export async function parseStringSync(str : any) {
    let body;
    parseString(str, (e, r) => {
        //console.dir(r)
        body = r;

    });
    return await body;
}

export async function wait(ms:number){
    return new Promise((resolve,reject)=>setTimeout(resolve,ms));
}