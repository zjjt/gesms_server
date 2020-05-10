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
export function concatenateNumberSymtel(arr:any){
    let result="";
    arr.map((e:any,i:any,arra:any)=>{
        if(i==arra.length-1){                
            result+=e.to;
        }
        result+=e.to+"+"   
    });
    return result;
}
export function parseSymtelResponse(str:any){
    let parts=str.split("|");
    let respArr:any=[];
    parts.forEach((e:any)=> {
        let partie=e.split(":");
        partie[0]=partie[0].substring(4);
        respArr.push({number:partie[0],status:partie[1]});
    });
    return respArr;
}
export async function wait(ms:number){
    return new Promise((resolve,reject)=>setTimeout(resolve,ms));
}

