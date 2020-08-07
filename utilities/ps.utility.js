// Parse-Server related utilities
require('dotenv').config();
const ParseServer = require('parse-server').ParseServer;

const parseServerConstructor = (databaseCollectionName, appId, serverPath, SSEClasses ) => {
    return {
        ParseServer: ParseServer,
        api: new ParseServer({
                databaseURI: `${process.env.DATABASE_ROOT_URI}/${databaseCollectionName}`,
                cloud: process.env.CLOUD_CODE_MAIN || './cloud/main.js',
                appId: appId,
                masterKey: process.env.MASTER_KEY || 'myMasterKey',
                serverURL: `${process.env.SERVER_ROOT_URI}/p/${serverPath}`,
                SSEClasses: SSEClasses
            }),
        mountPath: '/p/' + serverPath
    }
    
}


const parseServersInitialization = (...serverInitializationDatas) => {

    let serverInstances = [];

    serverInitializationDatas.forEach( ({databaseCollectionName, appId, serverPath, SSEClasses}) => {
        serverInstances.push(parseServerConstructor(databaseCollectionName, appId, serverPath, SSEClasses));
    })

    return {serverInstances};

}

module.exports = {
    parseServerConstructor, parseServersInitialization
}

