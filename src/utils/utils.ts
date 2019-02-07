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