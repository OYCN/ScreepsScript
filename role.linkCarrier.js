module.exports = (linkId, sourceType, targetIds) => ({
    // 获取能量
    source: (creep, allTasks)  => {
        var tasks = allTasks[creep.memory.roomName];
        if(sourceType == 'enLink'){
            var target = Game.getObjectById(linkId);
            if(target.stor.getUsedCapacity(RESOURCE_ENERGY) == 0 && tasks.haveStorEnergySto.length > 0){
                target = creep.pos.findClosestByPath(tasks.haveStorEnergySto)
            }
        }
        else if(sourceType == 'onlyLink'){
            var target = Game.getObjectById(linkId);
        }

        if(creep.withdraw(target[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target[0]);
            return false;
        }
    },

    target: (creep, allTasks) => {
        // var tasks = allTasks[creep.memory.roomName];
        for(const idx in targetIds){
            var target = Game.getObjectById(targetIds[idx]);
            if(target){
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
    },
    // 状态切换条件
    switch: creep => creep.updateState(),
    say_source: '⚡去开矿',
    say_target: '💳去存粮',
})