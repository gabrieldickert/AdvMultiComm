
function playByteArray( byteArray ) {

	var own_ctx = new (window.AudioContext || window.webkitAudioContext)();
	
	
	own_ctx.decodeAudioData(byteArray.buffer, function(buffer) {
          var source = own_ctx.createBufferSource();
          source.buffer = buffer;
          source.connect(own_ctx.destination);
          source.start(0);
	});
}

function stringToUint(string) {
    return new TextEncoder("utf-8").encode(string);
}

function uintToString(uintArray) {
    return new TextDecoder().decode(uintArray);
}