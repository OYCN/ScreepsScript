const upgrader = require('role.upgrader');
const havester = require('role.havester');
const farHavester = require('role.farHavester');
const builder = require('role.builder');
const repairer = require('role.repairer');
const carrier = require('role.carrier');
const attacker = require('role.attacker');
const reserver = require('role.reserver');

module.exports = {
    // 角色名: 角色配置项 记得修改矿的 id
    upgrader: upgrader('9fa9077331385d3', 'W5N8'),
    havester: havester('9fa9077331385d3', 'W5N8'),
    builder: builder('68050773313e4cb', 'W5N8'),
    repairer: repairer('68050773313e4cb', 'W5N8'),
    carrier: carrier('68050773313e4cb', 'W5N8'),

    havester1: havester('9fa9077331385d3', 'W5N8'),
    havester2: havester('68050773313e4cb', 'W5N8'),
    havester3: farHavester('0d080772ccae8f2', 'W5N8', 'W6N8'),
    havester4: farHavester('6bb50772cca441b', 'W5N8', 'W6N8'),

    upgrader1: upgrader('9fa9077331385d3', 'W5N8'),
    builder1: builder('68050773313e4cb', 'W5N8'),
    repairer1: repairer('68050773313e4cb', 'W5N8'),
    carrier1: carrier('68050773313e4cb', 'W5N8'),

    attacker1: attacker('attacker1', 'fe8abbd12006dee'),
    reserver1: reserver('W6N8', 'fe8abbd12006dee'),

}