
// 实现creep的body设定

const bodys = {
    MOVE: 50,
    WORK: 100,
    CARRY: 50,
    ATTACK: 80,
    RANGED_ATTACK: 150,
    HEAL: 250,
    CLAIM: 600,
    TOUGH: 10,
}

// 包含一个CARRY 和若干 WORK MOVE
const havester = function(energy){
    var body = [CARRY];
    energy -= bodys['CARRY']; // -50
    const base = bodys['WORK'] + bodys['MOVE'];
    for(;energy>=base;energy-=base) body=body.concat([WORK,MOVE]);
    return body;
}

// 一个 CARRY 最多对应5个 WORK 
const builder = function(energy){
    var body = [];
    energy += bodys['MOVE']; // +50

    const base1 = bodys['WORK']*5 + bodys['MOVE']*6 + bodys['CARRY']*1;
    var num = parseInt(energy/base1);
    for(var i=0;i<num;i++) body=body.concat([WORK,WORK,WORK,WORK,WORK,
                                        CARRY,
                                        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                        ]);
    energy -= num*base1;
    // 至少能凑出一个 WORK MOVE CARRY
    // 一个 CARRY 同等 WORK MOVE
    if(energy>=200){
        energy -= bodys['CARRY'] + bodys['MOVE'];
        body=body.concat([CARRY, MOVE]);
        const base2 = bodys['WORK'] + bodys['MOVE'];
        for(;energy>=base2;energy-=base2) body=body.concat([WORK,MOVE]);
    }
    body.splice(body.indexOf(MOVE),1); //删除一个 MOVE
    return body;
}

// 一个 CARRY 最多对应25个 WORK 
const upgrader = function(energy){
    var body = [];
    energy += bodys['MOVE']; // +50

    const base1 = bodys['WORK']*25 + bodys['MOVE']*26 + bodys['CARRY']*1;
    var num = parseInt(energy/base1);
    for(var i=0;i<num;i++) body=body.concat([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                            WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                            WORK,WORK,WORK,WORK,WORK,
                                            CARRY,
                                            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                            ]);
    energy -= num*base1;
    // 至少能凑出一个 WORK MOVE CARRY
    // 一个 CARRY 同等 WORK MOVE
    if(energy>=200){
        energy -= bodys['CARRY'] + bodys['MOVE'];
        body=body.concat([CARRY, MOVE]);
        const base2 = bodys['WORK'] + bodys['MOVE'];
        for(;energy>=base2;energy-=base2) body=body.concat([WORK,MOVE]);
    }
    body.splice(body.indexOf(MOVE),1); //删除一个 MOVE
    return body;
}

// 只包含 MOVE CARRY
const carrier = function(energy){
    var body = [];
    energy += bodys['MOVE']; // 增加一个 MOVE 位置
    const base = bodys['CARRY'] + bodys['MOVE'];
    for(;energy>=base;energy-=base) body=body.concat([CARRY,MOVE]);
    body.splice(body.indexOf(MOVE),1); //删除一个 MOVE
    return body;
}

// 一个 WORK 多个 CARRY
const repairer = function(energy){
    var body = [WORK];
    energy -= bodys['WORK']; // -50
    const base = bodys['CARRY'] + bodys['MOVE'];
    for(;energy>=base;energy-=base) body=body.concat([CARRY,MOVE]);
    return body;
}

// 只需要 TOUGH 和 MOVE
const defender = function(energy){
    var body = []
    energy += bodys['MOVE']; // 增加一个 MOVE 位置
    const base = bodys['TOUGH'] + bodys['MOVE'];
    for(;energy>=base;energy-=base) body=body.concat([TOUGH,MOVE]);
    body.splice(body.indexOf(MOVE),1); //删除一个 MOVE
    return body;
}

// 只需要 ATTACK 和 MOVE
const attacker = function(energy){
    var body = []
    energy += bodys['MOVE']; // 增加一个 MOVE 位置
    const base = bodys['ATTACK'] + bodys['MOVE'];
    for(;energy>=base;energy-=base) body=body.concat([ATTACK,MOVE]);
    body.splice(body.indexOf(MOVE),1); //删除一个 MOVE
    return body;
}

// 只需要 CLAIM 和 MOVE
const claimer = function(energy){
    var body = [];
    energy += bodys['MOVE']; // 增加一个 MOVE 位置
    const base = bodys['CLAIM'] + bodys['MOVE'];
    for(;energy>=base;energy-=base) body=body.concat([CLAIM,MOVE]);
    body.splice(body.indexOf(MOVE),1); //删除一个 MOVE
    return body;
}

const getBody = energy => {
    return {
        havester: havester(energy),
        builder:  builder(energy),
        upgrader: upgrader(energy),
        carrier: carrier(energy),
        repairer: repairer(energy),
        defender: defender(energy),
        attacker: attacker(energy),
        claimer: claimer(energy),
    }
}

// 如果最大能量变化 就 重新计算配置
module.exports = function(energy) {
    const body = getBody(energy);
    var numConfig = {
        havester1: [body['havester'], 3, 'harvester'],
        carrier1: [body['carrier'], 2, 'carrier'], // 存储之间运输
        builder1: [body['builder'], 2, 'builder'],
        upgrader1: [body['upgrader'], 1, 'upgrader'],
        havester2: [body['havester'], 3, 'harvester'],
        carrier2: [body['carrier'], 1, 'carrier'], // 其他能源需求处运输
        repairer1: [body['repairer'], 0, 'repairer'],
        
        defender1: [body['defender'], 0, 'defender'],
        attacker1: [body['attacker'], 0, 'attacker'],
        claimer1: [body['claimer'], 0, 'claimer'],
    }

    // 根据能量改数量
    if(energy >= 800){
        for(const idx in numConfig){
            if(numConfig[idx][2]=='harvester')
                numConfig[idx][1] = 1;
        }
    }
    else if(energy >= 500){
        for(const idx in numConfig){
            if(numConfig[idx][2]=='harvester')
                numConfig[idx][1] = 2;
        }
    }


    return numConfig;
};