// 挂载 creep 拓展
const creepExtension = require('mount.creep');
const spawnExtension = require('autoSpawn');
const towerExtension = require('mount.tower');
const linkExtension = require('mount.link');
const myStor = require('autoMemory');
const getTasks = require('task');
const statistics = require('statistics');
const getTaskspl = require('taskPlus');
const ctlFlag = require('autoCtlFlag');

module.exports = function () {
    // var tasks = getTasks();
    const tasks = getTaskspl();

    myStor(tasks);
    ctlFlag();
    creepExtension();
    // console.log(JSON.stringify(Memory.spawnRoles['W5N8']))
    spawnExtension();
    towerExtension();
    linkExtension();

    if(Memory.pool == 1){
        var numH = 0;
        var numC = 0;
        for(const creep in Game.creeps){
            if(Game.creeps[creep].memory.role.slice(0,7)=='carrier') numC += 1;
            else if(Game.creeps[creep].memory.role.slice(0,8)=='havester') numH += 1;
        }
        if(Memory.backup.energy[roomName] <= 300 || (numC != 0 && allTasks[roomName].nowEnergy > 300)){
            console.log('nice, not pool, will exit pool mod');
            Memory.pool = -1;
        }
    }

    for(const name in Memory.creeps) {
        if(!Game.creeps[name]) {
            if(Memory.dffNumber[Memory.creeps[name].roomName][Memory.creeps[name].role] >= 0){
                console.log(`📔Add ${Memory.creeps[name].role} to spawnList`)
                Memory.spawnLists[Memory.creeps[name].roomName].push(Memory.creeps[name].role);
            }
            else{
                Memory.dffNumber[Memory.creeps[name].roomName][Memory.creeps[name].role] += 1;
                console.log(`📔Don't add ${Memory.creeps[name].role} to spawnList, because it's overflow`);
            }
            delete Memory.creeps[name];
        }
        else{
            Game.creeps[name].work(tasks);
        }
    }
    
    for (const spawn in Game.spawns){
        Game.spawns[spawn].work(tasks);
    }


    // 防御塔操作
    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    // for each tower
    for (let tower of towers) {
        // run tower logic
        tower.work();
    }

    // link操作
    var links = _.filter(Game.structures, s => s.structureType == STRUCTURE_LINK);
    // for each link
    for (let link of links) {
        // run link logic
        link.work();
    }

    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    statistics(tasks);
}