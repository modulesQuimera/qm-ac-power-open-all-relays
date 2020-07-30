module.exports = function(RED) {

    "use strict";
    function OpenAllRelaysNode(config) {
        RED.nodes.createNode(this, config);
        this.serial = config.serial;
        this.serialConfig = RED.nodes.getNode(this.serial);
        this.slot = config.slot;

        this.qtdAll = config.qtdAll;
        this.slot_n=[]; 
        this.slot_n.push(config.slot1);
        this.slot_n.push(config.slot2) ;
        this.slot_n.push(config.slot3) ;
        this.slot_n.push(config.slot4) ;
        this.slot_n.push(config.slot5) ;
        this.slot_n.push(config.slot6) ;
        this.slot_n.push(config.slot7) ;
        this.slot_n.push(config.slot8) ;
        this.slot_n.push(config.slot9) ;
        this.slot_n.push(config.slot10) ;
        this.slot_n.push(config.slot11) ;
        this.slot_n.push(config.slot12) ;
        this.slot_n.push(config.slot13) ;
        this.slot_n.push(config.slot14) ;
        this.slot_n.push(config.slot15) ;
        this.slot_n.push(config.slot16) ;
        this.slot_n.push(config.slot17) ;
        this.slot_n.push(config.slot18) ;
        this.slot_n.push(config.slot19) ;
        this.slot_n.push(config.slot20) ;
        this.slot_n.push(config.slot21) ;
        this.slot_n.push(config.slot22) ;
        this.slot_n.push(config.slot23) ;
        this.slot_n.push(config.slot24) ;

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
                    for(var j=0; j<node.qtdAll; j++){
                        file.slots[slot].jig_test.push(
                            {
                                type: "AC_power_source_virtual_V1_0",
                                slot: parseInt(node.slot_n[j]),
                                method: "open_all_relays",
                                get_output: {},
                                compare: {}
                            }
                        );
                    }
                }
                else{
                    file.slots[slot].jig_error.push(command);
                    for(var j=0; j<node.qtdAll; j++){
                        file.slots[slot].jig_error.push(
                            {
                                type: "AC_power_source_virtual_V1_0",
                                slot: parseInt(node.slot_n[j]),
                                method: "open_all_relays",
                                get_output: {},
                                compare: {}
                            }
                        );
                    }
                }
            }
            else{
                if(slot === "begin"){
                    file.slots[0].jig_test.push(command);
                    for(var j=0; j<node.qtdAll; j++){
                        file.slots[0].jig_test.push(
                            {
                                type: "AC_power_source_virtual_V1_0",
                                slot: parseInt(node.slot_n[j]),
                                method: "open_all_relays",
                                get_output: {},
                                compare: {}
                            }
                        );
                    }
                }
                else{
                    file.slots[3].jig_test.push(command);
                    for(var j=0; j<node.qtdAll; j++){
                        file.slots[3].jig_test.push(
                            {
                                type: "AC_power_source_virtual_V1_0",
                                slot: parseInt(node.slot_n[j]),
                                method: "open_all_relays",
                                get_output: {},
                                compare: {}
                            }
                        );
                    }
                }
            }
            globalContext.set("exportFile", file);
            console.log(command);
            send(msg);
        });
    }
    RED.nodes.registerType("OpenAllRelays", OpenAllRelaysNode);
};