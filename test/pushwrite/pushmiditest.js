var MidiStream = require('midi-stream')
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
var stringtopushsysex = function(thestring, line){
    line = (line === undefined) ? 24 : line + 24;
    line = Math.min(line, 27);
    line = Math.max(line, 24);

    var sysexmessage = [240,71,127,21];
    sysexmessage.push(line);
    sysexmessage.push(0,69,0);
    for(var i = 0; i < 68; i++){
        if(i < mystring.length)
            sysexmessage.push(mystring.charCodeAt(i));    
        else
            sysexmessage.push(32);
    };
    sysexmessage.push(247);

    return sysexmessage;
};

var mystring = "f  adkjadflkjadflkja;lkjkljf a";
var mymessage = stringtopushsysex(mystring, 1);
console.log(mymessage);
push.write(mymessage);

// light up beat repeat buttons
for (var i = 36; i < 44; i++)
    push.write([176, i, 90]);

//console.log(typeof mymessage);
//console.log(typeof x);
