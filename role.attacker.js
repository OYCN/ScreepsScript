/**
 * 收割者配置生成器
 * source: 从指定矿中挖矿
 * target: 将其转移到 存储设备 中
 * 
 * @param sourceId 要挖的矿 id
 */
module.exports = (groupName, escapeId) => ({
    // 非战斗
    source: (creep, allTasks)  => {
        if(creep.memory.working==-1){
            creep.moveTo(Game.getObjectById(escapeId).pos);
        }
    },
    // 战斗
    target: (creep, allTasks) => {
        if(!Memory.value[groupName]) return;
        const creepId = Memory.value[groupName].targetId;
        const roomName = Memory.value[groupName].roomName;
        const target = Game.getObjectById(creepId);
        if (!target) {
            if(!path){
                var path = Game.map.findRoute(creep.room, roomName);
            }
            if(!path || path.length==0){
                //console.log(`can't find object with id:[${creepId}] in ${roomName}`);
                // creep.moveTo(Game.flags['attack']);
                if(Game.flags[creep.memory.role].room.name == creep.room.name && Memory.dffNumber[creep.memory.role]<0){
                    delete Memory.value['attack1'];
                    Game.flags[creep.memory.role].setColor(COLOR_GREEN);
                    Memory.spawnConfigs[creep.memory.role][1] = 0;
                    Memory.backup.spawnConfig = 1;
                }
                return;
            }
            // console.log(JSON.stringify(path));
            if(path[0].room == creep.room.name) path.shift();
            creep.moveTo(creep.pos.findClosestByPath(path[0].exit));
        }
        else{
            if (creep.attack(target) == ERR_NOT_IN_RANGE) creep.moveTo(target)
        }
    },
    // 状态切换条件
    switch: creep => {
        if(!Game.flags[creep.memory.role]){
            // 如果没有旗帜 就等待
            creep.say('waiting...');
            creep.memory.working = 0;
            return false;
        }
        else if(Game.flags[creep.memory.role].color == COLOR_WHITE){
            // 如果有白旗 就逃走
            creep.say('run~~');
            creep.memory.working = -1;
            return false;
        }
        else if(Game.flags[creep.memory.role].color == COLOR_RED){
            // 如果有红旗 就进攻
            creep.say('Rush! Rush!');
            creep.memory.working = 1;
            return true;
        }
        else{
            creep.say('what color??');
            creep.memory.working = 0;
            return false;
        }
    },
    say_source: '⚡去开矿',
    say_target: '💳去存粮',
})