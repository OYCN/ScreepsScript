// 引入 creep 配置项
const linkConfigs = require('config.link');

module.exports = function () {
    // 添加 work 方法
    StructureLink.prototype.work = function() {
        if(!linkConfigs[this.id]) return;
        const config = linkConfigs[this.id];
        if(config[1] == 'always')
            this.transferEnergy(Game.getObjectById(config[0]));
        else if(config[1] == 'whenMax'){
            if(this.store.getFreeCapacity(RESOURCE_ENERGY)==0){
                this.transferEnergy(Game.getObjectById(config[0]));
            }
        }
        else{
            console.log(`Link with ID:${this.id}, method error!`);
        }
    }
    // 添加 updateState 方法
    StructureLink.prototype.updateState = function() {

    }

};