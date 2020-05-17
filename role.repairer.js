/**
 * 建造者配置生成器
 * source: 优先从存储设备获取能量， 其次矿源
 * target: 优先修理设施， 其次升级控制器
 * 
 * @param sourceId 默认的矿的 id
 */
module.exports = sourceId => ({
    // 获取能量
    source: (creep, allTasks)  => {
        var tasks = allTasks[creep.room.name];
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
            creep.say('No Energy!');
        }
    },
    
    target: (creep, allTasks) => {
        var tasks = allTasks[creep.room.name];
        // 第一优先级 修理普通建筑
        if(tasks['needRepairOther'].length > 0) {
            var target = creep.pos.findClosestByPath(tasks.needRepairOther);
            if(creep.repair(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        // 第二优先级 修理 rampart
        else if(tasks['needRepairRampart'].length > 0) {
            var target = creep.pos.findClosestByPath(tasks.needRepairRampart);
            if(creep.repair(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        // 第三优先级 修理 wall
        else if(tasks['needRepairWall'].length > 0) {
            var target = creep.pos.findClosestByPath(tasks.needRepairWall);
            if(creep.repair(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
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
    say_target: '🚧去修理',
})