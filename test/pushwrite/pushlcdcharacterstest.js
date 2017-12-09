var MidiStream = require('midi-stream')
var push = MidiStream('Ableton Push User Port')

knobvals = [];
for (var i = 0; i < 8 ; i++){
    knobvals.push( i  );
}

lightson = [];
push.on('data', function(data){
    console.log(data);
    if (data[0] === 144)
        push.write([144, data[1], Math.max(data[2], 4)]);

    if (data[0] === 176 ){
        if(data[1] < 80 && data[1] > 70){
            //var mymessage = stringtopushsysex(String(data[2]),  1 );
            knobvals[data[1]-71] = data[2];
            var mymessage = stringtopushsysex(knobvals,  1 );
            push.write(mymessage);
        }else{
            // toggle all of the control lights on the push
            if (data[2] === 127){
                lightson[data[1]] = !lightson[data[1]];
                push.write([176, data[1], 127 * lightson[data[1]]]);
                //console.log(lightson);
            }
        }
    }
    
});

// create a sysex message
var stringtopushsysex = function(mystring, line){
    line = (line === undefined) ? 24 : line + 24;
    line = Math.min(line, 27);
    line = Math.max(line, 24);

    //sysex header
    var sysexmessage = [240,71,127,21];
    sysexmessage.push(line);
    //console.log(line);
    sysexmessage.push(0,69,0);

    if ( Array.isArray(mystring) ){
        if (mystring.length === 8 ) {
        }

        for (var i = 0 ; i < 8 ; i++){
            var thestring = String(mystring[i]);
            var chararray = [];
            var iterlength = thestring.length; 
            iterlength = Math.min (iterlength, 8);
            for (var s = 0 ; s < iterlength; s++){
                chararray.push( thestring[s].charCodeAt(0) );    
            }
            while(chararray.length < 8){
                chararray.push(32);
            }
            for (var j = 0 ; j < 8; j++){
                sysexmessage.push( chararray[j] );
            }
            if ( i % 2 == 0 ){
                sysexmessage.push(124);
            }
        }
    }

    if ( typeof mystring === "string" ){
        console.log("stringggg");
         
        asciiKeys = [];
        for (var i = 0; i < mystring.length; i ++)
              asciiKeys.push(mystring[i].charCodeAt(0));

        // the ascii codes to send
        for(var i = 0; i < 68; i++){
            //var thechar = ( (line-24)* 68 ) + i;
            var thechar = asciiKeys[i];
            thechar = thechar || 32;
            // doesn't respond to codes over 127
            thechar = Math.min(thechar, 127);
            //var thechar = 32;
            //console.log( thechar );
            sysexmessage.push(thechar);
        };

    }

    // finish sysex message
    sysexmessage.push(247);

    return sysexmessage;
};

push.write([240,71,127,21,28,0,0,247]);
stringtopushsysex("flajfl",  4 );

for (var i = 36 ; i < 100; i++)
    push.write([144,i, 2]);

lightson[44] = true;
lightson[45] = true;
lightson[46] = true;
lightson[47] = true;
push.write([176, 44, 127*lightson[44]]);
push.write([176, 45, 127*lightson[45]]);
push.write([176, 46, 127*lightson[46]]);
push.write([176, 47, 127*lightson[47]]);
