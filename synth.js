var synth = flock.synth({
    synthDef: {
        id: "carrier",
        ugen: "flock.ugen.sinOsc",
        freq: 440,
        mul: {
            id: "mod",
            ugen: "flock.ugen.sinOsc",
            freq: 1.0,
            mul: {
                ugen: "flock.ugen.env.simpleASR",
                gate: 0,
                attack: 0.25,
                sustain: 1.0,
                release: 0.5
            }
        }
    }
});

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
            var vibrato= msg.note / 32;
            synth.set({
                "mod.freq": vibrato
            });
        }
    }
 
});

var abletonNoteOns = function(msg){
    
    // push knob touches
    if (msg.note < 12){
    }
    // push buttons 
    if(msg.note > 12){
            var vel = msg.velocity/ 127;
            synth.set({
                "carrier.freq": flock.midiFreq(msg.note),
                "mod.mul.gate": 1.0,
                "mod.mul.sustain": vel
            });
            console.log(msg.note);
            console.log(synth.get("carrier.freq"));
    }
};

/*
// FUTURE? 
// midi output? Activate button lights
var pushout = flock.midi.connection({
    
    openImmediately: true, 
    ports: {
        name: "Ableton Push User Output" 
    },


});

pushout.send({})

*/
