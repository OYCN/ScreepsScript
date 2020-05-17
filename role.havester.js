/**
 * 收割者配置生成器
 * source: 从指定矿中挖矿
 * target: 将其转移到 存储设备 中
 * 
 * @param sourceId 要挖的矿 id
 */
module.exports = (sourceId, fromRoomName) => ({
    // 采集能量矿
    source: (creep, allTasks)  => {
        //var tasks = allTasks[fromRoomName];
        const source = Game.getObjectById(sourceId);
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) creep.moveTo(source)
    },

    target: (creep, allTasks) => {
        var tasks = allTasks[creep.memory.roomName];
        // console.log(JSON.stringify(tasks));
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
        // 运送到 sto
        else if(tasks.needStorEnergySto.length > 0){
            var target = creep.pos.findClosestByPath(tasks.needStorEnergySto);
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        // 最后优先级 升级
        else{
            return true;
        }
    },
    // 状态切换条件
    switch: creep => creep.updateState(),
    say_source: '⚡去开矿',
    say_target: '💳去存粮',
})