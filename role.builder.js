/**
 * 建造者配置生成器
 * source: 从指定矿中挖矿
 * target: 将其转移到指定的 roomController 中
 * 
 * @param sourceId 要挖的矿 id
 */
module.exports = (sourceId, fromRoomName) => ({
    // 获取能量
    source: (creep, allTasks) => {
        var tasks = allTasks[creep.memory.roomName];
        if(tasks.haveStorEnergySto.length > 0){
            var target = creep.pos.findClosestByPath(tasks.haveStorEnergySto);
            if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        else if(tasks.haveStorEnergyCon.length > 0){
            var target = creep.pos.findClosestByPath(tasks.haveStorEnergyCon);
            if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        else{
            const source = Game.getObjectById(sourceId)
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) creep.moveTo(source)
        }
    },
    
    target: (creep, allTasks) => {
        var tasks = allTasks[creep.memory.roomName];
        // 第一优先级 建造便宜建筑
        if(tasks['needBuildCheap'].length) {
            var target = creep.pos.findClosestByPath(tasks.needBuildCheap);
            if(creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        // 建造昂贵建筑 条件：存储的能量足够 spawn 填充 2 次， 并且 spawn 必须满
        //else if(tasks['needBuildEx'].length != 0 && tasks['spawnAll'] == tasks['spawnNow'] && tasks['nowEnergy'] >= tasks['spawnAll']*3) {
        else if(tasks['needBuildEx'].length && tasks['spawnAll'] == tasks['spawnNow']) {
            var target = creep.pos.findClosestByPath(tasks.needBuildEx);
            if(creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        // // 第二优先级 修复 不包含墙
        // else if(tasks['needRepairOther'].length > 0) {
        //     var target = creep.pos.findClosestByPath(tasks.needRepairOther);
        //     if(creep.repair(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(target);
        //     }
        // }
        // 最后优先级 升级
        else{
            if (creep.upgradeController(tasks['needUpgrader'][0]) == ERR_NOT_IN_RANGE) creep.moveTo(tasks['needUpgrader'][0]);
        }
    },
    // 状态切换条件
    switch: creep => creep.updateState(),
    say_source: '⚡去开矿',
    say_target: '🚧去建造',
})