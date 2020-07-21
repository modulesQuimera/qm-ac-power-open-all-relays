module.exports = function(RED) {

    "use strict";
    function OpenAllRelaysNode(config) {
        RED.nodes.createNode(this, config);
        this.serial = config.serial;
        this.serialConfig = RED.nodes.getNode(this.serial);
        this.slot = config.slot;
        // node.output = config.output
        var node = this;
        node.on('input', function(msg, send, done) {
            var globalContext = node.context().global;
            var exportMode = globalContext.get("exportMode");
            var currentMode = globalContext.get("currentMode");
            var file = globalContext.get("exportFile");
            var command = {
                type: "AC_power_source_virtual_V1_0",
                slot: parseInt(node.slot),
                method: "open_all_relays",
                get_output: {},
                compare: {}
            };
            var slot = globalContext.get("slot");
            if(!(slot === "begin" || slot === "end")){
                if(currentMode == "test"){
                    file.slots[slot].jig_test.push(command);
                }
                else{
                    file.slots[slot].jig_error.push(command);
                }
            }
            else{
                if(slot === "begin"){
                    file.slots[0].jig_test.push(command);
                    // file.begin.push(command);
                }
                else{
                    file.slots[3].jig_test.push(command);
                    // file.end.push(command);
                }
            }
            globalContext.set("exportFile", file);
            console.log(command);
            send(msg);
        });
    }
    // nome do modulo
    RED.nodes.registerType("OpenAllRelays", OpenAllRelaysNode);
};