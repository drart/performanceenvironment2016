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



// https://gist.github.com/colinbdclark/0bd443589eec51d0756bff736e6c346d
// 0.2.0
var interconnectBus = flock.environment.busManager.acquireNextBus("interconnect");
// 0.1.6
//var interconnectBus = flock.enviro.shared.acquireNextBus("interconnect");

var buster = flock.synth({
	synthDef : {
		ugen: "flock.ugen.out",
		bus: interconnectBus, 
		expand: 1, 
		sources: {
			ugen: "flock.ugen.impulse",
			rate: "control", 
			freq: 2
		}
	}
});

var gobble = flock.synth({
            synthDef : {
                id: "gobble",
                ugen: "flock.ugen.pan2",
                pan : -1, 
                source : {
                    ugen: "flock.ugen.sinOsc",
                    freq: 220,
                    mul : {
			             ugen: "flock.ugen.env.simpleASR",
			             start: 0.0,
			             attack: 0.01,
			             sustain: 0.2,
			             release: 0.1,
			             gate: {
			                 ugen: "flock.ugen.in",
					 bus: interconnectBus,
			    
                         }
		          } 
                }
            }
});
        
        var gibble = flock.synth({
            synthDef : {
                id: "gibble",
                ugen: "flock.ugen.pan2",
                pan : 1, 
                source : {
                    ugen: "flock.ugen.delay",
                    maxTime: 1.0,
                    time: 0.05,
                    source: {
                        ugen: "flock.ugen.sinOsc",
                        freq: 440,
                        mul : {
                            ugen: "flock.ugen.env.simpleASR",
			                 start: 0.0,
			                 attack: 0.01,
			                 sustain: 0.2,
			                 release: 0.1,
			                 gate: {
			                     ugen: "flock.ugen.in",
			                     bus: interconnectBus,
			    
                         }
		              }
                    }
                }
            }
});
        
var myNoise = flock.synth({
    synthDef: {
	id: "nnn",
	ugen: "flock.ugen.whiteNoise",
	mul: {
	    ugen: "flock.ugen.asr",
	    start: 0.0,
	    attack: 0.1,
	    sutain: 0.1,
	    release: 1.0
	}
    }
});


var dusty = flock.synth({
    synthDef: {
        id: "dusty" ,             
        ugen: "flock.ugen.freeverb",
        mix: 1,
        room: 0.75,
        damp: 1,
        source: {
            ugen: "flock.ugen.dust",
            density: 100, 
            mul: 0.25
        }
    }
});



var dust = flock.synth({
    synthDef: {
        id: "dd",
        ugen: "flock.ugen.dust",
        density: 200,
        mul: 0.25
    }
});
        
