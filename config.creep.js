const upgrader = require('role.upgrader');
const havester = require('role.havester');
const farHavester = require('role.farHavester');
const builder = require('role.builder');
const repairer = require('role.repairer');
const carrier = require('role.carrier');
const attacker = require('role.attacker');
const reserver = require('role.reserver');

const sourceId1 = '9fa9077331385d3';
const sourceId2 = '68050773313e4cb';

module.exports = {
    // upgrader: upgrader(),
    // havester: havester(),
    // builder: builder(),
    // repairer: repairer(),
    // carrier: carrier(),

    havester1: havester(sourceId1),
    havester2: havester(sourceId2),
    havester3: farHavester('0d080772ccae8f2', 'W5N8', 'W6N8'),
    havester4: farHavester('6bb50772cca441b', 'W5N8', 'W6N8'),

    upgrader1: upgrader(sourceId2, "it's my first time to play in a public server.QAQ", '7d2e649d27c31d7'),
    builder1: builder(sourceId2),
    repairer1: repairer(sourceId2),
    carrier1: carrier('withoutOther', ['140361cc5a057ce']),
    carrier2: carrier('onlyOther'),

    attacker1: attacker('attacker1', 'fe8abbd12006dee'),
    reserver1: reserver('W6N8', 'fe8abbd12006dee'),

}