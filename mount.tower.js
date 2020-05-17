
module.exports = function () {
    // 添加 work 方法
    StructureTower.prototype.work = function() {
        var target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        // if one is found...
        if (target != undefined) {
            // ...FIRE!
            this.attack(target);
        }
    }

};