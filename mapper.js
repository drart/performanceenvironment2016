var abletonpush = flock.midi.connection({
    // This should only be used if you know the port you want to use
    // ahead of time. Otherwise, the system.ports object should be bound to a UI
    // of some kind and the user should be allowed to select their ports.
    // When a selection has been made, invoke .open() on this connection.
    // Remember that the whole system is asynchronous, which means you have to wait
    // for the ready() event to get the current list of ports.
    openImmediately: true,
    // This option is highly configurable. In the simplest case,
    // you can specify a "manufacturer" properity, a port "name" property (e.g. QUNEO), or both.
    // If you want more complex routings, you can specify "inputs" and "outputs" objects,
    // which can contain "manufacturer" and "name" properties. This allows
    // you to route input signals from a different device than the output.
    // You can even specify arrays for the "input" and "output" properties 
    // if you want to listen for MIDI message on multiple ports or send broadcast
    // messages to multiple device.
    // But for most simple cases, you'll just want to refer to the device either 
    // by port name or manufacturer.
    ports: {
        name : "Ableton Push User Port"
    },

    listeners: {
        noteOn: function (msg) {
            abletonNoteOns(msg);
        },
        noteOff: function () {
            synth.set("mod.mul.gate", 0);
        },
        control: function (msg) {
            abletonCCs(msg);
        },
        pitchbend: function(msg) {
            console.log(msg);
        },
        aftertouch: function(msg){
            console.log(msg);
        }
    }
 
});

// map knobs to glitchseq
var abletonCCs = function(msg){
    // push knobs
    if (msg.number < 79 && msg.number > 70){
	// glitchseq
         glitches[msg.number - 71].prob = msg.value / 127;
         console.log(msg.value / 127);
    }
    // play button
    if (msg.number === 85){
        glitchseq.play();
        buster.play();
        gibble.play();
        gobble.play();

        abletonpush.send([176, 85, 127]); // dim play light 
    }
};

var abletonNoteOns = function(msg){
    //knob touches
    if (msg.note > 11){
    
    }
    // grid buttons 
    if(msg.note > 35 ){
        var vel = msg.velocity/ 127;
        synth.set({
            "carrier.freq": flock.midiFreq(msg.note),
            "mod.mul.gate": 1.0,
            "mod.mul.sustain": vel
        });
        //console.log(msg.note);
        //console.log(synth.get("carrier.freq"));
    }
};

// ---------------------------------
// SETUP PUSH LIGHTS
// ---------------------------------
(function(){
    setTimeout( function(){
        abletonpush.send([176, 85, 1]); // dim play light 
    }, 1000);
})();

/*
// FUTURE? 
// midi output? Activate button lights
start by clearing them all
*/


// ---------------------------------
// SETUP OSC.JS
// ---------------------------------
var port = new osc.WebSocketPort({
    url: "ws://localhost:8081"
});

port.on("message", function (oscMessage) {
    //$("#message").text(JSON.stringify(oscMessage, undefined, 2));
    console.log("message", oscMessage);
});

port.open();
/*
var sayHello = function () {
    port.send({
        address: "/hello",
        args: ["world"]
    });
};
*/
