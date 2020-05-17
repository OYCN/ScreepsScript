
module.exports = function () {
    // 添加 work 方法
    StructureTower.prototype.work = function() {
        // 修复 从最少耐久的开始
        var closestDamagedStructure = Game.rooms[this.room.name].find(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        }).sort((a,b) => {return a.hits-b.hits});
        if(closestDamagedStructure.length) {
            this.repair(closestDamagedStructure[0]);
        }
        // 攻击
        var target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target != undefined) {
            this.attack(target);
        }
    }

};