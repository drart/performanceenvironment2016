var MidiStream = require('midi-stream')
var sleep = require('sleep');
var push = MidiStream('Ableton Push User Port')

push.on('data', console.log);

// push button light up
//push.write([144, 70, 127]);
// left arrow light up
//push.write([176, 85, 0]);
// write to push screen!!!
//var x =[240,71,127,21,24,0,69,0,72,73,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,247]; 
//push.write(x);

// create a sysex message
var stringtopushsysex = function(asciicode, line){
    line = (line === undefined) ? 24 : line + 24;
    line = Math.min(line, 27);
    line = Math.max(line, 24);

    var sysexmessage = [240,71,127,21];
    sysexmessage.push(line);
    sysexmessage.push(0,69,0);
    sysexmessage.push(asciicode);    
    for(var i = 0; i < 67; i++){
            sysexmessage.push(32);
    };
    sysexmessage.push(247);

    return sysexmessage;
};

for (var i = 0; i < 256; i++){
    var mymessage = stringtopushsysex(i, 1);
    push.write(mymessage);
    sleep.sleep(1);
}

