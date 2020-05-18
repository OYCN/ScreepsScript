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
            if (creep.pickup(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        else if(tasks.haveStorEnergyCon.length+tasks.haveStorEnergySto.length > 0){
            var list = tasks.haveStorEnergyCon.concat(tasks.haveStorEnergySto);
            var target = list.sort((a,b) => {return b.store.getUsedCapacity(RESOURCE_ENERGY)/b.store.getCapacity(RESOURCE_ENERGY)
                                                -a.store.getUsedCapacity(RESOURCE_ENERGY)/a.store.getCapacity(RESOURCE_ENERGY)})
            if (creep.withdraw(target[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target[0]);
            }
        }
        // 从 con 里拿能量
        else if(tasks.haveStorEnergyCon.length > 0){
            var target = creep.pos.findClosestByPath(tasks.haveStorEnergyCon);
            if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        // 从 sto 里拿
        else if(tasks.haveStorEnergySto.length > 0){
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
            //var target = creep.pos.findClosestByPath(tasks.needOtherEnergy);
            var target = tasks.needOtherEnergy.sort((a,b) => {return a.store.getUsedCapacity(RESOURCE_ENERGY)-b.store.getUsedCapacity(RESOURCE_ENERGY)})
            // console.log(JSON.stringify(creep.transfer(target[0], RESOURCE_ENERGY)))
            if(creep.transfer(target[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target[0]);
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