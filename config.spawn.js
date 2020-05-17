
// Game.spawns['Spawn1'].spawnCreep([ATTACK, ATTACK, ATTACK, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE], 'my_attcker1', {memory: {role: 'attcker1'}}); 

// max 200
// 初始
const config1 = {
    havester1: [[WORK,CARRY,MOVE], 3],
    havester2: [[WORK,CARRY,MOVE], 0],
    builder1: [[WORK,CARRY,MOVE], 2],
    upgrader1: [[WORK,CARRY,MOVE], 1],
    carrier1: [[WORK,CARRY,MOVE], 1],
    repairer1: [[WORK,CARRY,MOVE], 0],
    defender1: [[WORK,CARRY,MOVE], 0],
};

// max 200
// 初始生产后
const config2 = {
    havester1: [[WORK,CARRY,MOVE], 3],
    havester2: [[WORK,CARRY,MOVE], 4],
    builder1: [[WORK,CARRY,MOVE], 2],
    upgrader1: [[WORK,CARRY,MOVE], 1],
    carrier1: [[WORK,CARRY,MOVE], 1],
    repairer1: [[WORK,CARRY,MOVE], 1],
    defender1: [[WORK,CARRY,MOVE], 0],
};


// max 350
// 第一波ex和const有了后， 最好const有一些储量了， 此配置增强能量采集运输
const config3 = {
    havester1: [[WORK, WORK,CARRY,MOVE, MOVE], 3],
    havester2: [[WORK, WORK,CARRY,MOVE, MOVE], 4],
    upgrader1: [[WORK,CARRY,MOVE], 1],
    builder1: [[WORK,CARRY,MOVE], 2],
    carrier1: [[WORK, CARRY,CARRY,MOVE, MOVE], 1],
    repairer1: [[WORK,CARRY,MOVE], 2],
    defender1: [[WORK,CARRY,MOVE], 0],
};

// max 350
const config4 = {
    havester1: [[WORK, WORK, WORK, CARRY, MOVE], 3],
    havester2: [[WORK, WORK, WORK, CARRY, MOVE], 4],
    upgrader1: [[WORK, WORK, CARRY,MOVE, MOVE], 1],
    builder1: [[WORK, WORK, CARRY,MOVE, MOVE], 2],
    carrier1: [[WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 2],
    repairer1: [[WORK, WORK, CARRY, MOVE, MOVE], 2],
    defender1: [[WORK, WORK, CARRY, MOVE, MOVE], 0],
};

// max 400
const config5 = {
    havester1: [[WORK, WORK, WORK, CARRY, MOVE], 3],
    havester2: [[WORK, WORK, WORK, CARRY, MOVE], 3],
    //havester3: [[WORK, CARRY, CARRY, CARRY, MOVE], 1],
    upgrader1: [[WORK, WORK, CARRY,MOVE, MOVE], 1],
    builder1: [[WORK, WORK,CARRY,MOVE, MOVE], 4],
    carrier1: [[WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 2],
    repairer1: [[WORK, CARRY, CARRY,MOVE, MOVE], 2],
    defender1: [[TOUGH, TOUGH, CARRY,MOVE, MOVE], 0],
};

const config6 = {
    havester1: [[WORK, WORK, WORK, CARRY, MOVE, MOVE], 3],
    havester2: [[WORK, WORK, WORK, CARRY, MOVE, MOVE], 3],
    havester3: [[WORK, CARRY, CARRY, MOVE, MOVE], 1],
    havester4: [[WORK, CARRY, CARRY, MOVE, MOVE], 1],
    
    upgrader1: [[WORK, WORK, CARRY,MOVE, MOVE], 1],
    builder1: [[WORK, WORK, CARRY, CARRY,MOVE, MOVE], 2],
    carrier1: [[WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 2], 
    repairer1: [[WORK, CARRY, CARRY, CARRY,MOVE, MOVE], 2],

    defender1: [[TOUGH, TOUGH, CARRY,MOVE, MOVE], 0],
    attacker1: [[ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE], 0],
    reserver1: [[CLAIM, MOVE], 0],
};

const config7 = {
    havester1: [[WORK, WORK, CARRY, MOVE], 3],
    havester2: [[WORK, WORK, CARRY, MOVE], 3],
    havester3: [[WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 1],
    havester4: [[WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 1],
    upgrader1: [[WORK, WORK, CARRY,MOVE, MOVE], 1],
    builder1: [[WORK, WORK, CARRY, CARRY,MOVE, MOVE], 4],
    carrier1: [[WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 4], 
    repairer1: [[WORK, CARRY, CARRY, CARRY,MOVE, MOVE], 2],
    defender1: [[TOUGH, TOUGH, CARRY,MOVE, MOVE], 0],
};

module.exports = {
    config1: config1,
    config2: config2,
    config3: config3,
    config4: config4,
    config5: config5,
    config6: config6,
    config7: config7,
};