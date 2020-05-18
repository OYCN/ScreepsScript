// JSON.stringify()JSON.stringify
const autoConfig = require('autoConfig');

module.exports = function (allTasks) {
    // 此变量控制是否重新填装生成配置
    if(Memory.willReload == undefined){
        Memory.willReload = true;
    }
    // 此变量控制是否进行全局评估
    if(!Memory.hasInit){
        Memory.hasInit = {};
    }
    // 缺人模式 降低预计能源消耗
    if(Memory.pool == undefined) Memory.pool = 0;
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
    // 检测每个房间需要建筑的建筑数量
    if(!Memory.backup.needBuildNum){
        Memory.backup.needBuildNum = {};
    }
    // 检测每个房间控制器等级
    if(!Memory.backup.roomCtlLevel){
        Memory.backup.roomCtlLevel = {};
    }
    // // 检测spawn的数量，使用默认0
    // if(!Memory.backup.spawnNumber){
    //     Memory.backup.spawnNumber = 0;
    // }
    if(!Memory.spawnLists){
        Memory.spawnLists = {};
    }
    // creep配置生成
    if(!Memory.spawnConfigs){
        Memory.spawnConfigs = {};
    }
    // creep配置的职位列表
    if(!Memory.spawnRole){
        Memory.spawnRole = {};
    }
    // 遍历全部spawn，如果没有相应的配置 或 没有监听能量变量 或 房间最大能量变化 或 配置没有职位表
    //  或 没有监听能量
    // 根据能量生成相应的配置，有变动便在后续mount.spawn中进行全局评估
    for(const spawn in Game.spawns){
        const roomName = Game.spawns[spawn].room.name;
        // console.log(JSON.stringify(Memory.hasSpawnInit))
        if(Memory.hasInit[roomName] == undefined) Memory.hasInit[roomName] = false;
        if(!Memory.spawnRole[roomName]) Memory.spawnRole[roomName] = new Array();
        if(!Memory.spawnLists[roomName]) Memory.spawnLists[roomName] = new Array();
        if(!Memory.dffNumber[roomName]) Memory.dffNumber[roomName] = {};
        if(!Game.spawns[spawn].memory.spawnList) Game.spawns[spawn].memory.spawnList = new Array();
        if(Game.spawns[spawn].memory.spawnConsume == undefined){
            if(allTasks[roomName].needStorEnergy.length+allTasks[roomName].haveStorEnergy.length > 0) 
                Game.spawns[spawn].memory.spawnConsume = true;
            else
                Game.spawns[spawn].memory.spawnConsume = false;
        }

        // 结构配置 能量变化
        if(Memory.pool == -1 || Memory.willReload || !Memory.spawnConfigs[roomName] || 
            !Memory.backup.energy[roomName] || Memory.backup.needBuildNum[roomName] == undefined || !Memory.backup.roomCtlLevel[roomName] ||
             Memory.backup.energy[roomName] != Game.rooms[roomName].energyCapacityAvailable ||
             Memory.backup.needBuildNum[roomName] != Game.rooms[roomName].find(FIND_MY_CONSTRUCTION_SITES).length ||
             Memory.backup.roomCtlLevel[roomName] != Game.rooms[roomName].controller.level){
            
            Memory.backup.energy[roomName] = Game.rooms[roomName].energyCapacityAvailable;
            Memory.backup.needBuildNum[roomName] = Game.rooms[roomName].find(FIND_MY_CONSTRUCTION_SITES).length;
            Memory.backup.roomCtlLevel[roomName] = Game.rooms[roomName].controller.level;
            var numH = 0;
            var numC = 0;
            for(const creep in Game.creeps){
                if(Game.creeps[creep].memory.role.slice(0,7)=='carrier') numC += 1;
                else if(Game.creeps[creep].memory.role.slice(0,8)=='havester') numH += 1;
            }
            // console.log(`C: ${numC} , H: ${numH}`);
            if(Memory.backup.energy[roomName] > 300 && (numC == 0 || (numC > 0 && allTasks[roomName].nowEnergy <= 300))){
                Memory.spawnConfigs[roomName] = autoConfig(300, roomName);
                Memory.pool = 1;
                console.log('spawn pool, force 300*energy!');
            }
            else{
                Memory.spawnConfigs[roomName] = autoConfig(Memory.backup.energy[roomName], roomName);
                if(Memory.pool == -1 ) console.log('already recover, using normal config~');
                Memory.pool = 0;
            }
            
            for(const role in Memory.spawnConfigs[roomName]) Memory.spawnRole[roomName].push(role);
            Memory.hasInit[roomName] = false;
        }
    }
    Memory.willReload = false;
    for(const creep in Memory.creeps){
        if(!Memory.creeps[creep].roomName){ //} || !Game.rooms[Memory.creeps[creep].roomName]){
            Memory.creeps[creep].roomName = Game.spawns[Object.keys(Game.spawns)[0]].room.name;
        }
        if(!Memory.creeps[creep].role){
            Memory.creeps[creep].role = 'none';
        }
        if(!Memory.creeps[creep].class){
            Memory.creeps[creep].class = Memory.creeps[creep].role.split('_')[0].slice(0,-1);
        }
    }
}