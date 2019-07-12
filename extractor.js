module.exports = function(RED) {
    function extractorNode(config) {
        RED.nodes.createNode(this,config);
        this.name = config.name;
        this.unitId = config.unitId;
        this.data = config.data;
        var node = this;
        node.on('input', function(msg) {


//Change Hex to a real number
if (msg.format === "float32") {
   human = msg.payload.buffer.readFloatBE(0,4).toFixed(2);
msg.payload = human;
    node.send(msg);
}
if (msg.format === "int64") {
   human = (((((msg.payload.data[0] * 65536 ) + msg.payload.data[1] ) * 65536 ) + msg.payload.data[2] ) * 65536 + msg.payload.data[3])/1000;
    msg.payload = human;
    node.send(msg);
}

if (msg.format === "uint32") {
    human = ((msg.payload.buffer.readUInt32BE(0,4))).toFixed(2);
    msg.payload = human;
    node.send(msg);
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
