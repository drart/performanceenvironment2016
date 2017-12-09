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
            knobvals[data[1]-71] = data[2];
            var mymessage = stringtopushsysex(knobvals,  1 );
            push.write(mymessage);
        }else{
            // toggle all of the control lights on the push
            if (data[2] === 127){
                lightson[data[1]] = !lightson[data[1]];
                push.write([176, data[1], 127 * lightson[data[1]]]);
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
    sysexmessage.push(0,68,0);

    if ( Array.isArray(mystring) ){
        if (mystring.length !== 8 ) {
        }

        for (var i = 0 ; i < 8 ; i++){
            var thestring = String(mystring[i]);
            var chararray = [];
            var iterlength = thestring.length; 
            iterlength = Math.min (iterlength, 8);
            for (var s = 0 ; s < iterlength; s++){
                chararray.push( thestring[s].charCodeAt(0) );    
            }
            // centers the string by putting a space at the beginning or end
            while(chararray.length < 8){
                if (chararray.length % 2 === 1)
                    chararray.push(32);
                else 
                    chararray.unshift(32);
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

        /*
        // the ascii codes to send
        for(var i = 0; i < 68; i++){
            var thechar = asciiKeys[i];
            thechar = thechar || 32;
            thechar = Math.min(thechar, 127);
            sysexmessage.push(thechar);
        };
        */
        while (asciiKeys.length < 68){
            if (asciiKeys.length % 2 === 1){
                asciiKeys.push(32);
            }else{
                asciiKeys.unshift(32);
            }
        }
        for (var i = 0; i < 68; i++){
            sysexmessage.push( asciiKeys[i] );
        }
        
    }

    // finish sysex message
    sysexmessage.push(247);

    return sysexmessage;
};


function clearlinesysex(line){
    line = (line === undefined) ? 28 : line + 28;
    line = Math.min(line, 31);
    line = Math.max(line, 28);
    return [240,71,127,21,line.valueOf(),0,0,247];
}

// clear line 1
push.write( clearlinesysex(2) );
push.write( clearlinesysex(1) );
push.write( clearlinesysex(3) );
push.write( clearlinesysex(5) );

var stringtest = stringtopushsysex("ffafadflakdjfjlk",0 );
console.log(stringtest);
push.write(stringtest);

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
