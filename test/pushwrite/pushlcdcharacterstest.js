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
var stringtopushsysex = function(line){
    line = (line === undefined) ? 24 : line + 24;
    line = Math.min(line, 27);
    line = Math.max(line, 24);

    //sysex header
    var sysexmessage = [240,71,127,21];
    sysexmessage.push(line);
    //console.log(line);
    sysexmessage.push(0,69,0);

    // the ascii codes to send
    for(var i = 0; i < 68; i++){
        var thechar = ( (line-24)* 68 ) + i;
        // doesn't respond to codes over 127
        thechar = Math.min(thechar, 127);
        //var thechar = 32;
        //console.log( thechar );
        sysexmessage.push(thechar);
    };
    // finish sysex message
    sysexmessage.push(247);

    return sysexmessage;
};

for (var i = 0; i < 4; i++){
    var mymessage = stringtopushsysex( i );
    //console.log(mymessage);
    push.write(mymessage);
}
