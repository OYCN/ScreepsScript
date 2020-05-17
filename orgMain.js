// 挂载 creep 拓展
const creepExtension = require('mount.creep');
const spawnExtension = require('mount.spawn');
const towerExtension = require('mount.tower');
const myStor = require('memory');
const getTasks = require('task');
const statistics = require('statistics');
const getTaskspl = require('taskPlus');
const ctlFlag = require('ctlFlag');

module.exports = function () {
    myStor();
    ctlFlag();
    creepExtension();
    spawnExtension();
    towerExtension();

    // var tasks = getTasks();
    var tasks = getTaskspl();

    for(const name in Memory.creeps) {
        if(!Game.creeps[name]) {
            if(Memory.dffNumber[Memory.creeps[name].role] >= 0){
                console.log(`📔Add ${Memory.creeps[name].role} to spawnList`)
                Memory.spawnList.push(Memory.creeps[name].role);
            }
            else{
                Memory.dffNumber[Memory.creeps[name].role] += 1;
                console.log(`📔Don't add ${Memory.creeps[name].role} to spawnList, because it's overflow`);
            }
            delete Memory.creeps[name];
        }
    }
    
    for (const spawn in Game.spawns){
        Game.spawns[spawn].work(tasks);
    }
    
    
    // console.log(JSON.stringify(tasks['W2N2'].resource));
    // 遍历所有 creep 并执行 work 方法
    for (const name in Game.creeps) {
        Game.creeps[name].work(tasks);
    }

    // 防御塔操作
    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    // for each tower
    for (let tower of towers) {
        // run tower logic
        tower.work();
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