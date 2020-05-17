/**
 * 收割者配置生成器
 * source: 从指定矿中挖矿
 * target: 将其转移到 存储设备 中
 * 
 * @param sourceId 要挖的矿 id
 */
module.exports = (roomName, escapeId) => ({
    // 无命令
    source: (creep, allTasks)  => {
        creep.moveTo(Game.getObjectById(escapeId).pos);
    },
    // 预定
    target: (creep, allTasks) => {
        if (!Game.rooms[roomName]) {
            if(!path){
                var path = Game.map.findRoute(creep.room, roomName);
            }
            // console.log(JSON.stringify(path));
            if(path[0].room == creep.room.name) delete path[0];
            creep.moveTo(creep.pos.findClosestByPath(path[0].exit));
        }
        else{
            if (path) delete path;
            // 如果不是中立房间，就进行攻击
            if (creep.reserveController(Game.rooms[roomName].controller) == ERR_NOT_IN_RANGE) creep.moveTo(Game.rooms[roomName].controller)
            else if(creep.reserveController(Game.rooms[roomName].controller) == ERR_INVALID_TARGET) creep.attackController(Game.rooms[roomName].controller)
        }
    },
    // 状态切换条件
    switch: creep => {
        if(Game.flags['reserve ' + roomName]){
            creep.memory.working = true;
            return true;
        }
        else{
            creep.memory.working = false;
            return false;
        }
    },
    say_source: '⚡去开矿',
    say_target: '💳去存粮',
})