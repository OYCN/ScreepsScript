const util = require('util')

module.exports = function () {
    if(!Memory.hasSpawnInit){
        Memory.hasSpawnInit = true;
        // 初始化总队列， 与初始队列任务
        // 检查是否有队列
        if(!Memory.spawnList){
            console.log('📥Creat List in Memory');
            Memory.spawnList = new Array();
        }
        // 遍历每个职位的需求量， 为新建的队列添加任务
        for(const role in Memory.spawnConfigs){
            if(Memory.spawnConfigs[role][1]<0) Memory.spawnConfigs[role][1]=0;
            var nowNumber = _.filter(Game.creeps, (creep) => creep.memory.role == role).length;
            // 检查总队列
            for(const memList in Memory.spawnList)
                if(Memory.spawnList[memList] == role) nowNumber += 1;
            // 检查每一个子队列
            for(const spawn in Memory.spawns)
                for(const idx in Memory.spawns[spawn].spawnList)
                    if(Memory.spawns[spawn].spawnList[idx] == role) nowNumber += 1;
            var dff = Memory.spawnConfigs[role][1] - nowNumber;
            if(dff >0){
                Memory.dffNumber[role] = 0;
                for(var i=0; i < dff; i++)
                    Memory.spawnList.push(role);
                console.log(`📥[NotClean]Dff of ${role} is ${dff}, nowNumber: ${nowNumber}, target: ${Memory.spawnConfigs[role][1]}`);
            }
            else{
                // 清理 spawn 队列
                for(const spawn in Memory.spawns){
                    for(const idx in Memory.spawns[spawn].spawnList){
                        if(Memory.spawnRoles.indexOf(Memory.spawns[spawn].spawnList[idx])==-1) delete Memory.spawns[spawn].spawnList[idx];
                        else if(dff < 0 && Memory.spawns[spawn].spawnList[idx] == role) {
                            delete Memory.spawns[spawn].spawnList[idx];
                            dff += 1;
                        }
                    }
                    Memory.spawns[spawn].spawnList = util.trimSpace(Memory.spawns[spawn].spawnList);
                }
                // 清理 总队列
                for(const memList in Memory.spawnList)
                    if(Memory.spawnRoles.indexOf(Memory.spawnList[memList])==-1) delete Memory.spawnList[memList];
                    else if(dff < 0 && Memory.spawnList[memList] == role)  {
                        delete Memory.spawnList[memList];
                        dff += 1;
                    }
                Memory.spawnList = util.trimSpace(Memory.spawnList);
                Memory.dffNumber[role] = dff;
                console.log(`📥[Clean]Dff of ${role} is ${dff}, lastNumber: ${nowNumber}, target: ${Memory.spawnConfigs[role][1]}`);
            }
        }
        // 初始化 spawn 队列
        for(const idx in Game.spawns){
            // 为没有属性的 spawn 添加队列
            if(!Game.spawns[idx].memory.spawnList){
                console.log('📥Creat List for ' + Game.spawns[idx].name);
                Game.spawns[idx].memory.spawnList = new Array();
            }
        }
    }
    // 检查任务队列
    Spawn.prototype.work = function(allTasks) { 
        tasks = allTasks[this.room.name];
        // 自己已经在生成了 / 内存里没有生成队列 / 生产队列为空 就啥都不干
        if (this.spawning) return;
        // 从房间队列获取任务
        if(this.memory.spawnList.length == 0 && Memory.spawnList.length != 0){
            console.log('📔Push a task to ' + this.name);
            this.memory.spawnList.push(Memory.spawnList.shift());
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

    // 将生成任务推入队列
    Spawn.prototype.addTask = function(taskName) { 
        // 任务加入队列
        this.memory.spawnList.push(taskName)
        return this.memory.spawnList.length
    }

    // creep 生成主要实现
    Spawn.prototype.mainSpawn = function(taskName) {
        if(Memory.spawnRoles.indexOf(taskName) == -1) {
            console.log('📕无此配置:' + taskName + ' 跳过生成');
            return -100; 
        }
        return this.spawnCreep(Memory.spawnConfigs[taskName][0], taskName + '_' + Game.time, 
            {memory: {role: taskName}}); 
    }
};