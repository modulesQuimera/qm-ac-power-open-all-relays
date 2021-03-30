module.exports = function(RED) {

    "use strict";

    function OpenAllRelaysNode(config) {
        RED.nodes.createNode(this, config);
        this.serial = config.serial;
        this.serialConfig = RED.nodes.getNode(this.serial);
        this.slot = config.slot;

        this.phase_selectorA = config.phase_selector1;
        this.phase_selectorB = config.phase_selector2;
        this.phase_selectorC = config.phase_selector3;
        this.phase_selectorIABC = config.phase_selector4;

        var node = this;
        node.on('input', function(msg, send, done) {
            var globalContext = node.context().global;
            var currentMode = globalContext.get("currentMode");
            var file = globalContext.get("exportFile");
            var command = {
                type: "AC_power_source_virtual_V1_0",
                slot: parseInt(node.slot),
                method: "open_relays",
                VA: node.phase_selectorA,
                VB: node.phase_selectorB,
                VC: node.phase_selectorC,
                IABC: node.phase_selectorIABC,
                get_output: {},
                compare: {}
            };
            var slot = globalContext.get("slot");
            if (!(slot === "begin" || slot === "end")) {
                if (currentMode == "test") {
                    file.slots[slot].jig_test.push(command);
                } else {
                    file.slots[slot].jig_error.push(command);
                }
            } else {
                if (slot === "begin") {
                    file.slots[0].jig_test.push(command);
                } else {
                    file.slots[3].jig_test.push(command);
                }
            }
            globalContext.set("exportFile", file);
            
            send(msg);
        });
    }
    RED.nodes.registerType("OpenAllRelays", OpenAllRelaysNode);
};