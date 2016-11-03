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
			                 ugen: "flock.ugen.impulse",
			                 rate: "control",
			                 freq: 2,
			    
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
                    time: 0,
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
			                     ugen: "flock.ugen.impulse",
			                     rate: "control",
			                     freq: 2,
			    
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


window.onload = function (){
    flock.enviro.shared.play();

    document.getElementById("tonepoints").onchange = function(){
        console.log(this.value);
    };

    document.getElementById("noise").onclick = function(){
               myNoise.set("nnn.mul.gate", 1);
               setTimeout(function(){myNoise.set("nnn.mul.gate",0)}, 100);
    };
};