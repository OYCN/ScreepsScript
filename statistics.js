// 统计信息

module.exports = function (tasks) {
    // 每 20 tick 运行一次
    if (Game.time % 20) return 
  
    if (!Memory.stats) Memory.stats = {}
    
    // 统计 GCL / GPL 的升级百分比和等级
    Memory.stats.gcl = (Game.gcl.progress / Game.gcl.progressTotal) * 100
    Memory.stats.gclLevel = Game.gcl.level
    Memory.stats.gpl = (Game.gpl.progress / Game.gpl.progressTotal) * 100
    Memory.stats.gplLevel = Game.gpl.level
    // CPU 的当前使用量
    Memory.stats.cpu = Game.cpu.getUsed()
    // bucket 当前剩余量
    Memory.stats.bucket = Game.cpu.bucket
    var energyMax = 0;
    var energyNow = 0;
    for(const room in tasks){
        energyMax += tasks[room].allEnergy + tasks[room].spawnAll;
        energyNow += tasks[room].nowEnergy + tasks[room].spawnNow;
    }
    Memory.stats.energyMax = energyMax;
    Memory.stats.energyNow = energyNow;
    //console.log('Stats sync success.');
}