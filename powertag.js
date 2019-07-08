module.exports = function(RED) {
    function powerTagNode(config) {
        RED.nodes.createNode(this,config);
        this.name = config.name;
        this.unitId = config.unitId;
        this.data = config.data;
        var node = this;
        node.on('input', function(msg) {
            var p=msg.payload;
            let settings = {
             name: p.name || node.name || "",
             unitId: p.unitId || node.unitId,
             data: p.data || node.data,
            };
            var res = {};
            if(settings.phase = "single"){
            switch(settings.data){
              case 0:
              case "current":
                res.payload = {
                    fc: 3,
                    unitid: settings.unitId,
                    address: 2999,
                    quantity: 2,
                    };
                res.topic = "current";
                res.format = "float32";
              break;
              case 1:
              case "voltage":
                res.payload = {
                    fc: 3,
                    unitid: settings.unitId,
                    address: 3027,
                    quantity: 2,
                    };
                res.topic = "voltage";
                res.format = "float32";
              break;
              case 2:
              case "actPower":
                res.payload = {
                    fc: 3,
                    unitid: settings.unitId,
                    address: 3053,
                    quantity: 2,
                    };
                res.topic = "actPower";
                res.format = "float32";
              break;
              case 3:
              case "totPower":
                res.payload = {
                    fc: 3,
                    unitid: settings.unitId,
                    address: 3059,
                    quantity: 2,
                    };
                res.topic = "totPower";
                res.format = "float32";
              break;
              case 4:
              case "totPFactor":
                res.payload = {
                    fc: 3,
                    unitid: settings.unitId,
                    address: 3083,
                    quantity: 2,
                    };
                res.topic = "totPFactor";
                res.format = "float32";
              break;
              case 5:
              case "parEnergy":
                res.payload = {
                    fc: 3,
                    unitid: settings.unitId,
                    address: 3255,
                    quantity: 4,
                    };
                res.topic = "parEnergy";
                res.format = "int64";
              break;
              case 6:
              case "totEnergy":
                res.payload = {
                    fc: 3,
                    unitid: settings.unitId,
                    address: 3203,
                    quantity: 4,
                    };
                res.topic = "totEnergy";
                res.format = "int64";
              break;
            }
          }else{
            //multiphase stuff
            switch(settings.data){
              case 0:
              case "current":
                res.payload = {
                    fc: 3,
                    unitid: settings.unitId,
                    address: 2999,
                    quantity: 2,
                    };
                res.topic = "current";
                res.format = "float32";
              break;
              case 1:
              case "voltage":
                res.payload = {
                    fc: 3,
                    unitid: settings.unitId,
                    address: 3027,
                    quantity: 2,
                    };
                res.topic = "voltage";
                res.format = "float32";
              break;
              case 2:
              case "actPower":
                res.payload = {
                    fc: 3,
                    unitid: settings.unitId,
                    address: 3053,
                    quantity: 2,
                    };
                res.topic = "actPower";
                res.format = "float32";
              break;
              case 3:
              case "totPower":
                res.payload = {
                    fc: 3,
                    unitid: settings.unitId,
                    address: 3059,
                    quantity: 2,
                    };
                res.topic = "totPower";
                res.format = "float32";
              break;
              case 4:
              case "totPFactor":
                res.payload = {
                    fc: 3,
                    unitid: settings.unitId,
                    address: 3083,
                    quantity: 2,
                    };
                res.topic = "totPFactor";
                res.format = "float32";
              break;
              case 5:
              case "parEnergy":
                res.payload = {
                    fc: 3,
                    unitid: settings.unitId,
                    address: 3255,
                    quantity: 4,
                    };
                res.topic = "parEnergy";
                res.format = "int64";
              break;
              case 6:
              case "totEnergy":
                res.payload = {
                    fc: 3,
                    unitid: settings.unitId,
                    address: 3203,
                    quantity: 4,
                    };
                res.topic = "totEnergy";
                res.format = "int64";
              break;
            }
          }
            node.send(res);
        });
    }
    RED.nodes.registerType("powerTag",powerTagNode);
}
