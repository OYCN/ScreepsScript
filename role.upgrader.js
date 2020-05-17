/**
 * 升级者配置生成器
 * source: 优先从存储设备获取能量， 其次矿源
 * target: 将其转移到指定的 roomController 中
 * 
 * @param sourceId 要挖的矿 id
 */
module.exports = (sourceId) => ({
    // 获取能量
    source: (creep, allTasks)  => {
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
            const source = Game.getObjectById(sourceId);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) creep.moveTo(source)
        }
    },
    // 升级控制器
    target: (creep, allTasks) => {
        var tasks = allTasks[creep.memory.roomName];
        if (creep.upgradeController(tasks['needUpgrader'][0]) == ERR_NOT_IN_RANGE) creep.moveTo(tasks['needUpgrader'][0]);
    },
    // 状态切换条件
    switch: creep => creep.updateState(),
    say_source: '⚡去开矿',
    say_target: '🔧去升级',
})