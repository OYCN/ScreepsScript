/**
 * 收割者配置生成器
 * source: 从指定矿中挖矿
 * target: 将其转移到 存储设备 中
 * 
 * @param sourceId 要挖的矿 id
 */
module.exports = (sourceId, fromRoomName,toRoomName) => ({
    // 采集能量矿
    source: (creep, allTasks)  => {
        tasks = allTasks[fromRoomName];
        const source = Game.getObjectById(sourceId);
        if (!source) {
            if(!path)
                var path = Game.map.findRoute(creep.room, toRoomName);
            if(path[0].room == creep.room.name) delete path[0];
            creep.moveTo(creep.pos.findClosestByPath(path[0].exit));
        }
        else{
            if (path) delete path;
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) creep.moveTo(source)
            else if(creep.harvest(source) == ERR_NOT_OWNER) creep.memory.mustReturn = true;
        }
    },

    target: (creep, allTasks) => {
        tasks = allTasks[fromRoomName];
        if(creep.room.name != fromRoomName){
            if(!path)
                var path = Game.map.findRoute(creep.room, fromRoomName);
            if(path[0].room == creep.room.name) delete path[0];
            creep.moveTo(creep.pos.findClosestByPath(path[0].exit));
            return;
        }
        else if (path) delete path;
        // 第一优先级 运送能量到容器
        if(tasks.needStorEnergyCon.length > 0){
            var target = creep.pos.findClosestByPath(tasks.needStorEnergyCon);
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        // 第二优先级 运送能量到 spawn 以及 拓展
        else if(tasks['needSpawnEnergy'].length > 0) {
            var target = creep.pos.findClosestByPath(tasks.needSpawnEnergy);
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        else if(tasks.needStorEnergySto.length > 0){
            var target = creep.pos.findClosestByPath(tasks.needStorEnergySto);
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        // 最后优先级 升级
        else{
            // console.log(tasks.needStorEnergy.length);
            if (creep.upgradeController(tasks['needUpgrader'][0]) == ERR_NOT_IN_RANGE) creep.moveTo(tasks['needUpgrader'][0]);
        }
        if(creep.memory.mustReturn && this.store[RESOURCE_ENERGY] == 0) creep.memory.mustReturn = false;
    },
    // 状态切换条件
    switch: creep => creep.updateState(),
    say_source: '⚡去开矿',
    say_target: '💳去存粮',
})
