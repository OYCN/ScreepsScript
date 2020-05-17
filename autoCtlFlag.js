const util = require('util');

module.exports = function () {
    
    for(const flagName in Game.flags){
        var flagArry = util.trimSpace(flagName.trim().split(" "));
        if(flagArry[0] == 'config'){
            if(flagArry.length == 2 && flagArry[1] == 'reload'){
                Memory.willReload = true;
                Game.flags[flagName].remove();
            }
        }
        else if(flagArry[0] == 'creep'){
            // creep add <role> <roomName>
            if(flagArry.length == 4 && flagArry[1] == 'add'){
                console.log(`📔Add ${flagArry[2]} to spawnList without respawn`);
                Memory.spawnLists[flagArry[3]].push(flagArry[2]);
                if(Memory.dffNumber[flagArry[3]]){
                    if(Memory.dffNumber[flagArry[3]][flagArry[2]]) Memory.dffNumber[flagArry[3]][flagArry[2]] -= 1;
                    else Memory.dffNumber[flagArry[3]][flagArry[2]] = -1;
                }
                Game.flags[flagName].remove();
            }
            else if(flagArry.length == 3 && flagArry[1] == 'add&respawn'){
                console.log(`📔Add ${flagArry[2]} to spawnList with respawn`);
                Memory.spawnLists[flagArry[3]].push(flagArry[2]);
                Game.flags[flagName].remove();
            }
        }
        else if(flagArry[0] == 'order'){
            if(flagArry.length == 3 && flagArry[1] == 'attack'){
                var pos = Game.flags[flagName].pos;
                Memory.value[flagArry[2]] = {
                    targetId: pos.findClosestByRange(FIND_HOSTILE_CREEPS).id,
                    roomName: Game.flags[flagName].room.name
                }
                Game.flags[flagName].remove();
                Room.createFlag(pos, 'flagArry[2]', COLOR_WHITE, COLOR_WHITE);
                
            }
        }
        else{

        }
    }

}