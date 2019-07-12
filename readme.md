## Node-RED easy configurator to read Schneider PowerTags over Modbus TCP

This module is a painless-to-use UI to read data from a Schneider PowerTag energy monitoring environment.
This module is NOT a Modbus TCP client, it is meant to be used with **node-red-contrib-modbus** modules.

## How to setup

### powerTag node
Use the `powerTag` node to setup which informaiton you want to request from the gateway.

Wire the output of the `powerTag` to the input of the `Modbus Flex Getter`.

### extractor node
Use the `extractor` node to convert the values from the modbus response into human readable numbers.

Wire the output of the `Modbus Flex Getter` to the input of the `extractor`.

## Equipment Compatibility

This module has been developed and tested on:
+ A9XMWA20 Schneider SmartLink Gateway
+ A9MEM1542 Schneider PowerTag
+ A9MEM1520 Schneider PowerTag
+ A9MEM1560 Schneider PowerTag Flex

This project is still a work in progress.
Inspired by the work of [hotswapster](https://github.com/hotswapster/powerTag).
