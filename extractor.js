module.exports = function(RED) {
    function extractorNode(config) {
        RED.nodes.createNode(this,config);
        this.name = config.name;
        this.unitId = config.unitId;
        this.data = config.data;
        var node = this;
        node.on('input', function(msg) {

          switch(msg.phase) {
    case "single":
        switch(msg.format) {
            case "float32":
                msg.payload = msg.payload.buffer.readFloatBE(0,4).toFixed(2);
                node.send(msg);
            break;
            case "uint32":
                msg.payload = msg.payload.buffer.readUInt32BE(0,4).toFixed(2);
                node.send(msg);
            break;
            case "int64":
                msg.payload = (((((msg.payload.data[0] * 65536 ) + msg.payload.data[1] ) * 65536 ) + msg.payload.data[2] ) * 65536 + msg.payload.data[3])/1000;
                node.send(msg);
            break;
            default:
                node.warn("Extractor not configured for this single phase data format: (" + msg.format + ")." );
                node.send(msg);
        }
    break;
    case "multi":
        switch(msg.format) {
            case "float32":
                let fL1 = msg.payload.buffer.readFloatBE(0,4).toFixed(2);
                let fL2 = msg.payload.buffer.readFloatBE(4,4).toFixed(2);
                let fL3 = msg.payload.buffer.readFloatBE(8,4).toFixed(2);
                let topic = msg.topic;
                msg.payload = {L1: {topic: fL1}, L2: {topic: fL2}, L3: {topic: fL3}};
                node.send(msg);
            break;
            case "uint32":
                let uL1 = msg.payload.buffer.readUInt32BE(0,4).toFixed(2);
                let uL2 = msg.payload.buffer.readUInt32BE(4,4).toFixed(2);
                let uL3 = msg.payload.buffer.readUInt32BE(8,4).toFixed(2);
                msg.payload = {L1: {topic: uL1}, L2: {topic: uL2}, L3: {topic: uL3}};
                node.send(msg);
            break;
            case "int64":
                let iL1 = (((((msg.payload.data[0] * 65536 ) + msg.payload.data[1] ) * 65536 ) + msg.payload.data[2] ) * 65536 + msg.payload.data[3])/1000;
                let iL2 = (((((msg.payload.data[0] * 65536 ) + msg.payload.data[1] ) * 65536 ) + msg.payload.data[2] ) * 65536 + msg.payload.data[3])/1000;
                let iL3 = (((((msg.payload.data[0] * 65536 ) + msg.payload.data[1] ) * 65536 ) + msg.payload.data[2] ) * 65536 + msg.payload.data[3])/1000;
                msg.payload = {L1: {topic: iL1}, L2: {topic: iL2}, L3: {topic: iL3}};
               node.send(msg);
            break;
            default:
                node.warn("Extractor not configured for this multi phase data format: (" + msg.format + ")." );
                node.send(msg);
        }
 }

          
//change Run Count from seconds to hours
//!!this needs updating to work with new powerTagNode!!
if (msg.ptTopic === "loadRunHourCounter") {
    var secToHour = (realValue / 3600).toFixed(0);
    msg.payload = secToHour;
    return [ msg, null ];
}
//!!this needs updating to work with new powerTagNode!!
// 0= Normal, 1 = Volt Loss, 2 = Overcurrent Trip
if (msg.ptTopic === "mcbTrip") {
    msg.payload = msg.payload.buffer.readUIntBE(0,4);
    return [ null, msg ];
    }
//!!this needs updating to work with new powerTagNode!!
//conversion code above

        });
    }
    RED.nodes.registerType("extractor",extractorNode);
}
