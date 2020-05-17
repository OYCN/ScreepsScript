/**
 * 收割者配置生成器
 * source: 从指定矿中挖矿
 * target: 将其转移到 存储设备 中
 * 
 * @param sourceId 要挖的矿 id
 */
module.exports = (type) => ({
    // 获取能量
    source: (creep, allTasks)  => {
        var tasks = allTasks[creep.memory.roomName];
        if(tasks.resource.length > 0){
            var target = creep.pos.findClosestByPath(tasks.resource);
            if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        else
        // 从 con 里拿能量
        if(tasks.haveStorEnergyCon.length > 0){
            var target = creep.pos.findClosestByPath(tasks.haveStorEnergyCon);
            if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        // 如果 con 能量不足 并且 spawn 一系列是满的 那就从 sto 里拿
        else if(tasks['spawnAll'] == tasks['spawnNow'] && tasks.haveStorEnergySto.length > 0){
            var target = creep.pos.findClosestByPath(tasks.haveStorEnergySto);
            if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        else{
            creep.say('No Energy!');
        }
    },

    target: (creep, allTasks) => {
        var tasks = allTasks[creep.memory.roomName];
        if(type=='onlyOther'){
            var target = creep.pos.findClosestByPath(tasks.needOtherEnergy);
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
                return false;
            }
        }
        // 第一优先级 运送能量到 ex
        if(tasks['needSpawnEnergyEx'].length > 0) {
            var target = creep.pos.findClosestByPath(tasks.needSpawnEnergyEx);
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        // 第二优先级 运送能量到 spawn
        else if(tasks['needSpawnEnergySpawn'].length > 0) {
            var target = creep.pos.findClosestByPath(tasks.needSpawnEnergySpawn);
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        // 第三优先级 运送能量到 其他设备
        else if(tasks['needOtherEnergy'].length > 0 && type!='withoutOther') {
            var target = creep.pos.findClosestByPath(tasks.needOtherEnergy);
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        // 第四优先级 运送能量到 中央存储
        else if(tasks['needStorEnergySto'].length > 0) {
            var target = creep.pos.findClosestByPath(tasks.needStorEnergySto);
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        else{
            return true;
        }
    },
    // 状态切换条件
    switch: creep => creep.updateState(),
    say_source: '⚡去开矿',
    say_target: '💳去存粮',
})