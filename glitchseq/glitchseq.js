var glitchticks = 0;
var glitches = [];
glitches.push( {
    samp: new Audio("glitchseq/beat1.wav"),
    prob: 1.0
});
glitches.push( {
    samp: new Audio("glitchseq/beat2.wav"),
    prob: 1.0
});
glitches.push( {
    samp: new Audio("glitchseq/beat3.wav"),
    prob: 1.0
});
glitches.push( {
    samp: new Audio("glitchseq/beat4.wav"),
    prob: 1.0
});
glitches.push( {
    samp: new Audio("glitchseq/beat5.wav"),
    prob: 1.0
});
glitches.push( {
    samp: new Audio("glitchseq/beat6.wav"),
    prob: 1.0
});
glitches.push( {
    samp: new Audio("glitchseq/beat7.wav"),
    prob: 1.0
});
glitches.push( {
    samp: new Audio("glitchseq/beat8.wav"),
    prob: 1.0
});

var glitchseq = flock.synth({
    synthDef: {
        ugen: "flock.ugen.triggerCallback",
        trigger: {
            ugen: "flock.ugen.impulse",
            freq: 2
        },
        options: {
            callback: {
                func: function(){
                    if (glitches[glitchticks % glitches.length].prob > Math.random()){
                        glitches[glitchticks % glitches.length].samp.play();
                        addCube();
                        visualeffect = !visualeffect;
                    }
                    glitchticks++;
                }
            }
        }
    }
});
