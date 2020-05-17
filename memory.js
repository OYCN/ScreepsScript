// JSON.stringify()JSON.stringify
const spawnConfigs = require('config.spawn');

module.exports = function () {
    if(!Memory.spawnConfig){
        console.log('📥Init index of spawn config');
        Memory.spawnConfig = 'config1';
        Memory.hasSpawnInit = false;
    }
    if(!Memory.dffNumber){
        Memory.dffNumber = {};
        Memory.hasSpawnInit = false;
    }
    if(!Memory.value){
        Memory.value = {};
    }
    if(!Memory.spawnConfigs){
        console.log('Gen Memory.spawnConfigs, if err maybe configs is undefine');
        Memory.spawnConfigs = spawnConfigs[Memory.spawnConfig];
        Memory.hasSpawnInit = false;
    }
    if(!Memory.backup || !Memory.backup.spawnConfig){
        Memory.backup = {
            spawnConfig: Memory.spawnConfig,
        };
        Memory.hasSpawnInit = false;
    }
    if(Memory.backup.spawnConfig != Memory.spawnConfig){
        console.log('Reload Config of spawn : ' + Memory.spawnConfig);
        if(!spawnConfigs[Memory.spawnConfig]){
            console.log('config name error, rollback');
            Memory.spawnConfig = Memory.backup.spawnConfig;
        }
        Memory.spawnConfigs = spawnConfigs[Memory.spawnConfig];
        Memory.backup.spawnConfig = Memory.spawnConfig
        Memory.spawnRoles = new Array(); 
        for(const role in Memory.spawnConfigs) Memory.spawnRoles.push(role);
        Memory.hasSpawnInit = false;
    }
    if(!Memory.spawnRoles){
        Memory.spawnRoles = new Array(); 
        for(const role in Memory.spawnConfigs) Memory.spawnRoles.push(role);
    }
}