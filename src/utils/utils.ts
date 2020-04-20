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
export function parseSymtelResponse(str:any){
    let parts=str.split("|");
    let respArr:any=[];
    parts.forEach((e:any)=> {
        let partie=e.split(":");
        partie[0]=partie[0].substring(4);
        respArr.push({number:partie[0],status:[1]});
    });
    return respArr;
}
export async function wait(ms:number){
    return new Promise((resolve,reject)=>setTimeout(resolve,ms));
}

