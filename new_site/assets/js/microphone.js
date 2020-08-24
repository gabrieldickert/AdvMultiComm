$('document').ready(function (e) {




    var audioCtx = null;
    var analyser = null;


    $('#mic').on('click', function (e) {


        audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        const source = audioCtx.createMediaStreamSource(player.srcObject);
        const processor = audioCtx.createScriptProcessor(512, 1, 1);


        analyser = audioCtx.createAnalyser();

        source.connect(processor).connect(analyser);
        processor.connect(audioCtx.destination);

        processor.onaudioprocess = function (e) {
            // Do something with the data, e.g. convert it to WAV
            
            
            let float_arr = e.inputBuffer.getChannelData(0);
            
            //Converting float Array to Unsigned Byte Array in Order to send the Chunks to channel
            let byte_arr = new Uint8Array(float_arr.buffer);
            
            
            console.log(byte_arr);

        };




    });

    const player = document.getElementById('player');

    const handleSuccess = function (stream) {
        if (window.URL) {
            player.srcObject = stream;
        } else {
            player.src = stream;
        }
    };

    navigator.mediaDevices.getUserMedia({audio: true, video: false})
            .then(handleSuccess);





});


/*
 * Copyright 2013 Boris Smus. All Rights Reserved.
 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 navigator.getUserMedia = (navigator.getUserMedia ||
 navigator.webkitGetUserMedia ||
 navigator.mozGetUserMedia ||
 navigator.msGetUserMedia);
 function MicrophoneSample() {
 this.WIDTH = 640;
 this.HEIGHT = 480;
 this.getMicrophoneInput();
 this.canvas = document.querySelector('canvas');
 }
 
 MicrophoneSample.prototype.getMicrophoneInput = function () {
 // TODO(smus): Remove this ugliness.
 var isLocalhost = window.location.hostname == 'localhost' ||
 window.location.hostname == '127.0.0.1';
 if (window.location.protocol != 'https:' && !isLocalhost) {
 alert('HTTPS is required for microphone access, and this site has no SSL cert yet. Sorry!');
 }
 navigator.getUserMedia({audio: true},
 this.onStream.bind(this),
 this.onStreamError.bind(this));
 };
 
 MicrophoneSample.prototype.onStream = function (stream) {
 var input = context.createMediaStreamSource(stream);
 var filter = context.createBiquadFilter();
 filter.frequency.value = 60.0;
 filter.type = filter.NOTCH;
 filter.Q = 10.0;
 
 var analyser = context.createAnalyser();
 
 // Connect graph.
 input.connect(filter);
 filter.connect(analyser);
 
 this.analyser = analyser;
 // Setup a timer to visualize some stuff.
 requestAnimFrame(this.visualize.bind(this));
 };
 
 MicrophoneSample.prototype.onStreamError = function (e) {
 console.error('Error getting microphone', e);
 };
 
 MicrophoneSample.prototype.visualize = function () {
 this.canvas.width = this.WIDTH;
 this.canvas.height = this.HEIGHT;
 var drawContext = this.canvas.getContext('2d');
 
 var times = new Uint8Array(this.analyser.frequencyBinCount);
 this.analyser.getByteTimeDomainData(times);
 for (var i = 0; i < times.length; i++) {
 var value = times[i];
 var percent = value / 256;
 var height = this.HEIGHT * percent;
 var offset = this.HEIGHT - height - 1;
 var barWidth = this.WIDTH / times.length;
 drawContext.fillStyle = 'black';
 drawContext.fillRect(i * barWidth, offset, 1, 1);
 }
 requestAnimFrame(this.visualize.bind(this));
 };*/