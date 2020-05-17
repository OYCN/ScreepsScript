
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

// 一个 CARRY 多个 WORK 
const builder = function(energy){
    var body = [CARRY];
    energy -= bodys['CARRY']; // -50
    const base = bodys['WORK'] + bodys['MOVE'];
    for(;energy>=base;energy-=base) body=body.concat([WORK,MOVE]);
    return body;
}

// 一个 CARRY 多个 WORK 
const upgrader = function(energy){
    var body = [CARRY];
    energy -= bodys['CARRY']; // -50
    const base = bodys['WORK'] + bodys['MOVE'];
    for(;energy>=base;energy-=base) body=body.concat([WORK,MOVE]);
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

module.exports = function(energy) {
    const body = getBody(energy);
    const numConfig = {
        havester1: [body['havester'], 0],
        havester2: [body['havester'], 0],

        carrier1: [body['carrier'], 0],
        builder1: [body['builder'], 0],
        repairer1: [body['repairer'], 0],
        upgrader1: [body['upgrader'], 0],

        defender1: [body['defender'], 0],
        attacker1: [body['attacker'], 0],
        claimer1: [body['claimer'], 0],
    }

    return numConfig;
};