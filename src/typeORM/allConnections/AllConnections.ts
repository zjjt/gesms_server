import {getConnectionOptions, createConnections} from "typeorm";

export const AllConnections = async() => {
    // const connectionOptionsExtranet = await getConnectionOptions(process.env.NODE_ENV + "ChapChap");
    // const connectionOptionsSunshine = await getConnectionOptions(process.env.NODE_ENV + "Sunshine");
    const connectionOptionsSmsauto = await getConnectionOptions(process.env.NODE_ENV + "SmsAuto");

    console.log("environnment de " + process.env.NODE_ENV + " sur toutes les connexions si developpement(Sunshine) === PRODUCTION");
    // console.log("database extranet is " + connectionOptionsExtranet.database);
    // console.log("database sunshine is " + connectionOptionsSunshine.database);
    console.log("database smsAuto is " + connectionOptionsSmsauto.database);

    return createConnections([//{
        //     ...connectionOptionsExtranet,
        //     name: "extranet"
        // }, 
        // {
        //     ...connectionOptionsSunshine,
        //     name: "sunshine"
        // }, 
        {
            ...connectionOptionsSmsauto,
            name: "smsauto"
        }
    ]);
}