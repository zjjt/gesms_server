import { parseString } from 'xml2js';
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
    console.log("length of the array is "+arr.length)
    let result="";    
    arr.map((e:any,i:any,arra:any)=>{
        if(i==arra.length-1){                
            result+="00225"+e.number;
        }else{
            result+="00225"+e.number+"+";  
        }
        
    });
    return result;
}
export function parseSymtelResponse(str:string){
    let parts=str.split("|");
    parts.map((e,i)=>console.log("valeur splitees i:"+i+" apres le | : "+e));
    let respArr:any=[];
    parts.forEach((e:any)=> {
       
        let partie=e.split(":");
        partie.map((en:any,i:any)=>console.log("valeur splitees i:"+i+" apres le : : "+en));
        partie[0]=partie[0].substring(5);
        if(partie[0]!=="")
        respArr.push({number:partie[0],status:partie[2]});
    });
    return respArr;
}
export async function wait(ms:number){
    return new Promise((resolve,reject)=>setTimeout(resolve,ms));
}

