// JSON.stringify()JSON.stringify
const autoSpawn = require('autoSpawn');

module.exports = function () {
    // 此变量控制是否进行全局评估
    if(!Memory.hasSpawnInit){
        Memory.hasSpawnInit = {};
    }
    // 记录全局creep与期望的数量差
    if(!Memory.dffNumber){
        Memory.dffNumber = {};
    }
    // 全局变量传递
    if(!Memory.value){
        Memory.value = {};
    }
    // 存放监测变量的上一值
    if(!Memory.backup){
        Memory.backup = {};
    }
    // 检测每个有spawn的房间的能量
    if(!Memory.backup.energy){
        Memory.backup.energy = {};
    }
    // // 检测spawn的数量，使用默认0
    // if(!Memory.backup.spawnNumber){
    //     Memory.backup.spawnNumber = 0;
    // }
    // creep配置生成
    if(!Memory.spawnConfigs){
        Memory.spawnConfigs = {};
    }
    // creep配置的职位列表
    if(!Memory.spawnRoles){
        Memory.spawnRoles = {};
    }
    // 遍历全部spawn，如果没有相应的配置 或 没有监听能量变量 或 房间最大能量变化 或 配置没有职位表
    //  或 没有监听能量
    // 根据能量生成相应的配置，有变动便在后续mount.spawn中进行全局评估
    for(spawn in Game.spawns){
        const roomName = spawn.room.name;
        if(!Memory.hasSpawnInit[roomName]) Memory.hasSpawnInit[roomName] = false;
        if(!Memory.spawnRoles[roomName]) Memory.spawnRoles[roomName] = new Array();
        if(!Memory.spawnList[roomName]) Memory.spawnList[roomName] = new Array();
        if(!Memory.dffNumber[roomName]) Memory.dffNumber[roomName] = {};
        if(!Game.spawns[spawn].spawnList) Game.spawns[spawn].spawnList = new Array();

        // 结构配置 能量变化
        if(!Memory.spawnConfigs[roomName] || !Memory.backup.energy[roomName] || Memory.backup.energy[roomName] != Game.rooms[roomName].energyCapacityAvailable){
            Memory.backup.energy[roomName] = Game.rooms[roomName].energyCapacityAvailable;
            Memory.backup.energy[roomName] = Game.rooms[spawn.room.name].energyCapacityAvailable;
            Memory.spawnConfigs[roomName] = autoSpawn(Memory.backup.energy[roomName]);
            
            for(const role in Memory.spawnConfigs[roomName]) Memory.spawnRoles[roomName].push(role);
            Memory.hasSpawnInit[roomName] = false;
        }
    }
    for(const creep in Memory.creeps){
        if(!Memory.creeps[creep].roomName){
            Memory.creeps[creep].roomName = Object.keys(Game.spawns)[0];
        }
        if(!Memory.creeps[creep].role){
            Memory.creeps[creep].role = 'none';
        }
    }
}