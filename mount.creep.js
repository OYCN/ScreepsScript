// 引入 creep 配置项
const creepConfigs = require('config.creep');

module.exports = function () {
    // 添加 work 方法
    Creep.prototype.work = function(allTasks) {
        // 检查 creep 内存中的角色是否存在
        if (!(this.memory.role in creepConfigs)) {
            console.log(`📒creep ${this.name} 内存属性 role:${this.memory.role} 不属于任何已存在的 creepConfigs 名称`);
            this.suicide();
            return;
        }
        // 获取对应配置项
        const creepConfig = creepConfigs[this.memory.role];

        // 没准备的时候就执行准备阶段
        if (!this.memory.ready) {
            // 有准备阶段配置则执行
            if (creepConfig.prepare && creepConfig.isReady) {
                creepConfig.prepare(this)
                this.memory.ready = creepConfig.isReady(this)
            }
            // 没有就直接准备完成
            else this.memory.ready = true
            return
        }

        // 获取是否工作
        const working = creepConfig.switch ? creepConfig.switch(this) : true
        // 执行对应操作
        if (working) {
            if (creepConfig.target) creepConfig.target(this, allTasks)
        }
        else {
            if (creepConfig.source) creepConfig.source(this, allTasks)
        }
    }
    // 添加 updateState 方法
    Creep.prototype.updateState = function() {
        // creep 身上没有能量 && creep 之前的状态为“工作”
        if(this.store[RESOURCE_ENERGY] <= 10 && this.memory.working) {
            this.memory.working = false;
            // this.say(creepConfigs[this.memory.role].say_source);
        }
        // creep 身上能量满了 && creep 之前的状态为“不工作”
        if(this.store[RESOURCE_ENERGY] >= this.store.getCapacity() && !this.memory.working) {
            this.memory.working = true;
            // this.say(creepConfigs[this.memory.role].say_target);
        }

        if(this.memory.mustReturn == true) this.memory.working = true;

        return this.memory.working
    }

};