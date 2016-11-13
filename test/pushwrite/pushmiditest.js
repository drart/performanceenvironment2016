var MidiStream = require('midi-stream')
var push = MidiStream('Ableton Push User Port')

push.on('data', console.log);

// push button light up
push.write([144, 70, 100]);
// write to push screen!!!
push.write([240,71,127,21,26,0,69,0,72,73,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,247]);
