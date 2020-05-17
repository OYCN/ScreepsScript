const util = require('util')

module.exports = function () {
    for(const roomName in Memory.hasSpawnInit){
        if(!Memory.hasSpawnInit[roomName]){
            Memory.hasSpawnInit = true;
            // 遍历每个职位的需求量， 为新建的队列添加任务
            for(const role in Memory.spawnConfigs[roomName]){
                var nowNumber = _.filter(Game.creeps, (creep) => creep.memory.role == role && creep.memory.roomName == roomName).length;
                // 检查总队列
                for(const memList in Memory.spawnList[roomName])
                    if(Memory.spawnList[roomName][memList] == role) nowNumber += 1;
                // 检查每一个对应的子队列
                for(const spawn in Game.spawns)
                    if(Game.spawns[spawn].room.name == roomName)
                        for(const idx in Game.spawns[spawn].spawnList)
                            if(Game.spawns[spawn].spawnList[idx] == role) nowNumber += 1;
                var dff = Memory.spawnConfigs[roomName][role][1] - nowNumber;
                if(dff >=0){
                    Memory.dffNumber[roomName][role] = 0;
                    for(var i=0; i < dff; i++)
                        Memory.spawnList[roomName].push(role);
                    console.log(`📥[NotClean]Dff of ${role} is ${dff}, nowNumber: ${nowNumber}, target: ${Memory.spawnConfigs[role][1]}`);
                }
                else{
                    // 清理 spawn 队列
                    for(const spawn in Game.spawns){
                        if(Game.spawns[spawn].room.name == roomName){
                            for(const idx in Game.spawns[spawn].spawnList){
                                if(Memory.spawnRoles[roomName].indexOf(Game.spawns[spawn].spawnList[idx])==-1) Game.spawns[spawn].spawnList.splice(idx,1);
                                else if(dff < 0 && Game.spawns[spawn].spawnList[idx] == role) {
                                    Game.spawns[spawn].spawnList.splice(idx,1);
                                    dff += 1;
                                }
                            }
                            Game.spawns[spawn].spawnList = util.trimSpace(Game.spawns[spawn].spawnList);
                        }
                    }
                    // 清理 总队列
                    for(const memList in Memory.spawnList[roomName])
                        if(Memory.spawnRoles[roomName].indexOf(Memory.spawnList[roomName][memList])==-1) Memory.spawnList[roomName].splice(memList,1);
                        else if(dff < 0 && Memory.spawnList[roomName][memList] == role)  {
                            Memory.spawnList[roomName].splice(memList,1);
                            dff += 1;
                        }
                    Memory.spawnList[roomName] = util.trimSpace(Memory.spawnList[roomName]);
                    Memory.dffNumber[roomName][role] = dff;
                    console.log(`📥[Clean]Dff of ${role} is ${dff}, lastNumber: ${nowNumber}, target: ${Memory.spawnConfigs[role][1]}`);
                }
            }
        }
    }
    // 检查任务队列
    Spawn.prototype.work = function(allTasks) { 
        tasks = allTasks[this.room.name];
        // 自己已经在生成了 / 内存里没有生成队列 / 生产队列为空 就啥都不干
        if (this.spawning) return;
        // 从房间队列获取任务
        if(this.memory.spawnList.length == 0 && Memory.spawnList[this.room.name].length != 0){
            console.log('📔Push a task to ' + this.name);
            this.memory.spawnList.push(Memory.spawnList[this.room.name].shift());
        }
        else if(this.memory.spawnList.length == 0) return;
        // 进行生成
        const spawnSuccess = this.mainSpawn(this.memory.spawnList[0])
        // 生成成功后移除任务
        if (spawnSuccess == OK) {
            console.log('📗Spawn success at ' + this.name);
            this.memory.spawnList.shift();
        }
        else if(spawnSuccess == -100){
            //console.log('unknow taskname, pass');
            this.memory.spawnList.shift();
        }
        else if(spawnSuccess == ERR_NOT_ENOUGH_ENERGY){
            if(tasks['spawnAll'] == tasks['spawnNow']){
                console.log('📕We Dont have such energy, pass');
                this.memory.spawnList.shift();
            }
        }
        else{
            console.log('📕Spawn error at ' + this.name + ' with ' + spawnSuccess + ' , pass');
            this.memory.spawnList.shift();
        }
    }

    // creep 生成主要实现
    Spawn.prototype.mainSpawn = function(taskName) {
        if(Memory.spawnRoles[this.room.name].indexOf(taskName) == -1) {
            console.log('📕无此配置:' + taskName + ' 跳过生成');
            return -100; 
        }
        return this.spawnCreep(Memory.spawnConfigs[taskName][0], taskName + '_' + this.room.name + '_' + Game.time, 
            {memory: {role: taskName, roomName: this.room.name}}); 
    }
};