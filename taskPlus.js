module.exports = function () {

    var tasks = {};

    for(const room in Game.rooms){

        var needBuildCheap = new Array();
        var needBuildEx = new Array();
        const cons = Game.rooms[room].find(FIND_MY_CONSTRUCTION_SITES);
        for(const idx in cons){
            var structure = cons[idx];

            if((structure.progressTotal - structure.progress) <= 5000){
                needBuildCheap.push(structure);
            }
            else{
                needBuildEx.push(structure);
            }
        }

        var needSpawnEnergySpawn = new Array();
        var needSpawnEnergyEx = new Array();
        var needStorEnergyCon = new Array();
        var haveStorEnergyCon = new Array();
        var needStorEnergySto = new Array();
        var haveStorEnergySto = new Array();
        var needOtherEnergy = new Array();
        var needRepairWall = new Array();
        var needRepairRampart = new Array();
        var needRepairOther = new Array();
        const strs = Game.rooms[room].find(FIND_STRUCTURES);
        for(const idx in strs){
            var structure = strs[idx];

            
            if(structure.structureType == STRUCTURE_SPAWN){
                if(structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
                    needSpawnEnergySpawn.push(structure);
            }
            else if(structure.structureType == STRUCTURE_EXTENSION){
                if(structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
                    needSpawnEnergyEx.push(structure);
            }
            else if(structure.structureType == STRUCTURE_CONTAINER){
                if(structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
                    needStorEnergyCon.push(structure);
                if(structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0)
                    haveStorEnergyCon.push(structure);
            }
            else if(structure.structureType == STRUCTURE_STORAGE){
                if(structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
                    needStorEnergySto.push(structure);
                if(structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0)
                    haveStorEnergySto.push(structure);
            }
            else if(structure.structureType == STRUCTURE_TOWER){
                if(structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
                    needOtherEnergy.push(structure);
            }

            if(structure.structureType == STRUCTURE_WALL && structure.hits < 3000)
                needRepairWall.push(structure);
            if(structure.structureType == STRUCTURE_RAMPART && structure.hits < structure.hitsMax)
                needRepairRampart.push(structure);
            if(structure.structureType != STRUCTURE_WALL && structure.hits < structure.hitsMax)
                needRepairOther.push(structure);
        }


        var needUpgrader = [Game.rooms[room].controller,];
        var needStorEnergy = needStorEnergyCon.concat(needStorEnergySto);
        var haveStorEnergy = haveStorEnergyCon.concat(haveStorEnergySto);

        var resource = Game.rooms[room].find(FIND_DROPPED_RESOURCES, {
                                        filter: (structure) => {
                                            return (structure.energy >= 100);
                                        }});
        var allEnergy = 0;
        var nowEnergy = 0;
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