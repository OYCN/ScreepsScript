module.exports = function () {

    var tasks = {};

    for(const room in Game.rooms){
        needBuildCheap = Game.rooms[room].find(FIND_MY_CONSTRUCTION_SITES, {
                                        filter: (structure) => {
                                            return (structure.progressTotal - structure.progress) <= 2000;
                                        }}),
        needBuildEx = Game.rooms[room].find(FIND_MY_CONSTRUCTION_SITES, {
                                            filter: (structure) => {
                                                return (structure.progressTotal - structure.progress) > 2000;
                                            }}),
        needSpawnEnergySpawn = Game.rooms[room].find(FIND_STRUCTURES, {
                                    filter: (structure) => {
                                        return (structure.structureType == STRUCTURE_SPAWN) &&
                                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                                    }}),
        needSpawnEnergyEx = Game.rooms[room].find(FIND_STRUCTURES, {
                                        filter: (structure) => {
                                            return (structure.structureType == STRUCTURE_EXTENSION) &&
                                                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                                        }}),
        needStorEnergyCon = Game.rooms[room].find(FIND_STRUCTURES, {
                                            filter: s => (s.structureType == STRUCTURE_CONTAINER ) &&
                                                        s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                                        });
        haveStorEnergyCon = Game.rooms[room].find(FIND_STRUCTURES, {
                                            filter: s => (s.structureType == STRUCTURE_CONTAINER) &&
                                                        s.store.getUsedCapacity(RESOURCE_ENERGY) > 0
                                        });
        needStorEnergySto = Game.rooms[room].find(FIND_STRUCTURES, {
                                                filter: s => (s.structureType == STRUCTURE_STORAGE ) &&
                                                            s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                                            });
        haveStorEnergySto = Game.rooms[room].find(FIND_STRUCTURES, {
                                                filter: s => (s.structureType == STRUCTURE_STORAGE ) &&
                                                            s.store.getUsedCapacity(RESOURCE_ENERGY) > 0
                                            });
        needOtherEnergy = Game.rooms[room].find(FIND_STRUCTURES, {
                                            filter: (structure) => {
                                                return (structure.structureType == STRUCTURE_TOWER) &&
                                                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                                            }}),
        needUpgrader = [Game.rooms[room].controller,];
        needRepairOther = Game.rooms[room].find(FIND_STRUCTURES, {
                                                filter: (s) => s.hits < s.hitsMax && 
                                                    s.structureType != STRUCTURE_WALL &&
                                                    s.structureType != STRUCTURE_RAMPART
                                            });

        needRepairWall = Game.rooms[room].find(FIND_STRUCTURES, {
                                            filter: (s) => s.hits < s.hitsMax*0.000001 && // 仅修复3K
                                                (s.structureType == STRUCTURE_WALL)
                                            });
        needRepairRampart = Game.rooms[room].find(FIND_STRUCTURES, {
                                                filter: (s) => s.hits < s.hitsMax && 
                                                    (s.structureType == STRUCTURE_RAMPART)
                                                });

        needStorEnergy = needStorEnergyCon.concat(needStorEnergySto);
        haveStorEnergy = haveStorEnergyCon.concat(haveStorEnergySto);

        resource = Game.rooms[room].find(FIND_DROPPED_RESOURCES, {
                                        filter: (structure) => {
                                            return (structure.energy >= 50);
                                        }});
        // 非spawn 的能量
        allEnergy = 0;
        nowEnergy = 0;
        for(const structure in haveStorEnergy){
            nowEnergy += haveStorEnergy[structure].store.getUsedCapacity(RESOURCE_ENERGY);
            allEnergy += haveStorEnergy[structure].store.getCapacity(RESOURCE_ENERGY);
        }
        tasks[room] = {
            needBuild: needBuildCheap.concat(needBuildEx),
            needBuildCheap: needBuildCheap,
            needBuildEx: needBuildEx,
            needSpawnEnergy: needSpawnEnergySpawn.concat(needSpawnEnergyEx),
            needSpawnEnergySpawn: needSpawnEnergySpawn,
            needSpawnEnergyEx: needSpawnEnergyEx,
            needStorEnergy: needStorEnergy,
            haveStorEnergy: haveStorEnergy,
            needStorEnergyCon: needStorEnergyCon,
            haveStorEnergyCon: haveStorEnergyCon,
            needStorEnergySto: needStorEnergySto,
            haveStorEnergySto: haveStorEnergySto,
            needOtherEnergy: needOtherEnergy,
            needUpgrader: needUpgrader,
            needRepairOther: needRepairOther,
            needRepairWall: needRepairWall,
            needRepairRampart: needRepairRampart,
            needRepair: needRepairOther.concat(needRepairWall),
            resource: resource,
            allEnergy: allEnergy,
            nowEnergy: nowEnergy,
            spawnAll: Game.rooms[room].energyCapacityAvailable,
            spawnNow: Game.rooms[room].energyAvailable,
        }
        // console.log(`nowEnergy: ${nowEnergy}, allEnergy: ${allEnergy}`);
    }

    return tasks;
    
}