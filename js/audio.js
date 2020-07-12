
    var audioCtx = null;
    var MicAudioCtx = null;
    var analyser = null;
    var track = null;
    var gainNode = null;
    var panner = null;
    var biquadFilter = null;
    var convolver = null;
    var canvas_interval_id = null;
    var frequenz_bar_interval_id = null;
    var sinuswave_interval_id = null;
    var oscillator = null;
    var audio_times_interval_id = null;
    const INTERVAL_REFRESH_MS_TIME = 50;
    var isPaused = false;
    var isPlaying = false;
    var isMuted = false;
    var audio = null;
    var soundSource = null;
    var splitter=null;
    var merger = null;
    var temp_arr = null;
    var splitterBuffer=null;
    var mergerBuffer=null;
    
    


   
    //Addding Eventlistener on the Controlbutton
    $('#audio-control-play-btn').on('click', function (e) {

        if (isPlaying) {

            $(this).find("i").removeClass("fa fa-play");

            $(this).find("i").addClass("fa fa-pause");

            pauseAudio();

        } else if (isPaused) {


            $(this).find("i").removeClass("fa fa-pause");

            $(this).find("i").addClass("fa fa-play");
			websocket.send("s|"+channelID);
            resumeAudio();
        }

    });


    /**
     * Control for the Mute Function
     */
    $('#audio-control-mute-btn').on('click', function (e) {



        if (isMuted) {

            $(this).find("i").removeClass("fa fa-volume-off");

            $(this).find("i").addClass("fa fa-volume-up");

            unmuteAudio();

        } else {
            $(this).find("i").removeClass("fa fa-volume-up");

            $(this).find("i").addClass("fa fa-volume-off");

            muteAudio();
        }



    });


    $('#audio-control-unmute-btn').on('click', function (e) {


        unmuteAudio();

    });








    /**
     * Draws the Progress of the Audio-Bar
     */
    $('#audio-time-progress-bar').on('click', function (e) {



        //Clearing the current Intervall
        // clearInterval(audio_times_interval_id);
        let canvasCtx = document.getElementById("audio-time-progress-bar").getContext('2d');

        canvasCtx.clearRect(0, 0, 250, 10);


        let rect = canvasCtx.canvas.getBoundingClientRect();
        let canvas_width = canvasCtx.canvas.width;
        let canvas_height = canvasCtx.canvas.height;


        let mouse_x = e.clientX;
        let mouse_y = e.clientY;



        let diff = rect.right - mouse_x;
        let track_duration = Math.round(track.mediaElement.duration);
        let current_time = Math.round(track.mediaElement.currentTime);

        let prz = current_time / track_duration * 100;

        let cax = 100 - (diff / 250) * 100;

        let audio_prz = track_duration / 100 * cax;

        let player = document.getElementById("player");

        player.currentTime = audio_prz;

    });





    //calling the graph on the volume and changing the volume
    $('#volume_slider').on('input', function (e) {

        var current_val = $('#volume_slider').val();
        var applied_gain = current_val / 100;

        gainNode.gain.value = applied_gain;


    });


    $('#panner_slider').on('input', function (e) {

        onPanningChanged($('#panner_slider').val());




    });




    /**
     *  vads a Paner to the AudioContext
     */

    function addPanerToAudioCtx() {


        let pannerOption = {pan: 0};

        panner = new StereoPannerNode(audioCtx, pannerOption);

        panner.pan.Value = 0;

    }



    $('#init-btn').on('click', function (e) {

        initAudioCtx();

    });


    $('#volume_slider').on('input', function (e) {



        let current_val = $('#volume_slider').val();
        let applied_gain = current_val / 100;

        $('#s0').html(Math.floor(applied_gain * 100) + "%");
    });


    /**
     * adds a Volumehanlder(Gain) to the AudioContext
     * @returns {undefined}
     */

    function addVolumeToAudioCtx() {
        gainNode = audioCtx.createGain();
        gainNode.gain.value = 1;
    }



    /**
     * 
     * @param int Value of the Volume/Gain
     */
    function onVolumeChanged(value) {

        gainNode.gain.value = 0.1;

    }

    function onPanningChanged(value) {

        panner.pan.value = value;

        $('#s1').html("" + value);

        console.log(audioCtx);
    }


    /**
     * Inits a new Audio Context
     */
    function initAudioCtx() {

        audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        analyser = audioCtx.createAnalyser();

        //creating a biQuadFiltermethod for the BiquadFilterNode
        biquadFilter = audioCtx.createBiquadFilter();
        convolver = audioCtx.createConvolver();


        isMuted = false;
        isPlaying = true;

        analyser.fftSize = 256;

        let audioElement = document.querySelector('audio');

        track = audioCtx.createMediaElementSource(audioElement);
        //panner.pan.value = $('#panner_slider').val();
        //onPanningChanged($('#panner_slider').val());   

        $('#s1').html($('#panner_slider').val());


        //soundSource = audioCtx.createBufferSource();
         //convolver.buffer = audio;
		 
		 //Adding Nodes to the Audiocontext
        addVolumeToAudioCtx();
        addPanerToAudioCtx();
        
        //Setting Visualization  to Frequencybars as Default
        analyseBytes();
        //Changing Select Value to Frequencybars aswell
        $('#waves').val("frequencybars");




        // connect our graph
        track.connect(analyser).connect(gainNode).connect(panner)/*.connect(biquadFilter).connect(oscillator)*/.connect(audioCtx.destination);


        var test = setInterval(function (e) {


            drawAudioProgressBar();
        }, INTERVAL_REFRESH_MS_TIME);

	}
	
	function convolverNode(url) {


//-------------Convolver Node---------------//

        ajaxRequest = new XMLHttpRequest();

        ajaxRequest.open('GET', url, true);

        ajaxRequest.responseType = 'arraybuffer';

		console.log(url);

        ajaxRequest.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				// debugger;
				var audioData = this.response;
				audioCtx.decodeAudioData(audioData, function (buffer) {
                    concertHallBuffer = buffer;
                    
					soundSource = audioCtx.createBufferSource();
                    soundSource.buffer=buffer;
                 
				}, function (e) {
					console.log("Error with decoding audio data" + e.err);
				});
			}
        };

        ajaxRequest.send();

    }

    function onOscillation() {

        oscillator = audioCtx.createOscillator();
        oscillator.connect(audioCtx.destination);
        
    }

    var oscw = document.getElementById("Oscillator_wave");
    oscw.onchange = function (oscwEvent) {
        var val = oscwEvent.target.value;
        var freq = document.getElementById("freq");
        freq.value = val;
        oscillator.frequency.value = val;
    }

    /**
     * adds a Volumehanlder(Gain) to the AudioContext
     * @returns {undefined}
     */

    function addVolumeToAudioCtx() {
        gainNode = audioCtx.createGain();
        gainNode.gain.value = 0.5;
    }

    var oscstart = document.getElementById("start");
    oscstart.onclick = function (oscEvent)
    {
        if (oscEvent.target.value === "start") {
            onOscillation();
            oscillator.start(0);
            oscEvent.target.value = "stop";

        } else
        {
            oscillator.stop(0);
            oscEvent.target.value = "start";
        }
    }





//-----------------Visualize Frequency Bar Graph--------------
    /**
     * draws the ProgressBar of the currently playing Audio 
     *
     */
    function drawAudioProgressBar() {




        let canvasCtx = document.getElementById("audio-time-progress-bar").getContext('2d');
        let width = 250;
        let height = 10;
        canvasCtx.fillStyle = 'rgb(128, 128, 128)';
        canvasCtx.fillRect(0, height / 2, width, height);


        let track_duration = Math.round(track.mediaElement.duration);
        let current_time = Math.round(track.mediaElement.currentTime);

        let prz = current_time / track_duration * 100;


        canvasCtx.fillStyle = 'rgb(0, 0, 0)';

        canvasCtx.fillRect(0, height / 2, width / 100 * prz, height);

        canvasCtx.fillStyle = 'rgb(255,255,255)';
       
        //Draws white dot for Rewind / Forward
        canvasCtx.fillRect(width / 100 * prz, height / 2, 5, height / 2);

        $('#audio-time-informs').html(gV(Math.floor(current_time / 60)) + ":" + gV(current_time % 60) + "/" + gV(Math.round(track_duration / 60)) + ":" + gV((track_duration % 60)));

    }


//---------------Visualize Sinus Wave -----------------//



    function drawSinusWave() {

        sinuswave_interval_id = setInterval(function (e) {

            console.log("SINUS");

            let WIDTH = 300;
            let HEIGHT = 400;
            let canvasCtx = document.getElementById("audio_visual_player").getContext('2d');
            analyser.fftSize = 2048;
            bufferLength = analyser.fftSize;
            var dataArray = new Uint8Array(bufferLength);

            canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
            

            analyser.getByteTimeDomainData(dataArray);

            canvasCtx.fillStyle = 'rgb(200, 200, 200)';
            canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = 'rgb(255, 0, 0)';

            canvasCtx.beginPath();

            var sliceWidth = WIDTH * 1.0 / bufferLength;
            var x = 0;

            for (var i = 0; i < bufferLength; i++) {

                var v = dataArray[i] / 128.0;
                var y = v * HEIGHT / 2;

                if (i === 0) {
                    canvasCtx.moveTo(x, y);
                } else {
                    canvasCtx.lineTo(x, y);
                }

                x += sliceWidth;
            }

            canvasCtx.lineTo(canvasCtx.Width, canvasCtx.Height / 2);
            canvasCtx.stroke();

        }, INTERVAL_REFRESH_MS_TIME);

    }


//-----------Creating Biquad Filter Actions------------//
    function onBiquadFilter() {

        biquadFilter.gain.setTargetAtTime(0, audioCtx.currentTime, 0)
        var voiceSetting = voiceSelect.value;
        console.log(voiceSetting);
        if (voiceSetting == "lowfrequency") {
            convolver.disconnect(0);
            biquadFilter.type = "lowshelf";
            biquadFilter.frequency.setTargetAtTime(500, audioCtx.currentTime, 0)
            biquadFilter.gain.setTargetAtTime(25, audioCtx.currentTime, 0)
            //biquadFilter.connect(audioCtx.destination);
            track.connect(biquadFilter).connect(audioCtx.destination);
        } else if (voiceSetting == "highfrequency") {
            convolver.disconnect(0);
            biquadFilter.type = "highshelf";
            biquadFilter.frequency.setTargetAtTime(1000, audioCtx.currentTime, 0)
            biquadFilter.gain.setTargetAtTime(25, audioCtx.currentTime, 0)
            //biquadFilter.connect(audioCtx.destination);
            track.connect(biquadFilter).connect(audioCtx.destination);
        } else {
            biquadFilter.disconnect(0);
            console.log("Voice settings turned off");


        }

    }
   

    //********split function :*************//
   
    var splitme = document.getElementById("split");
    
    splitme.onclick= function(oSplitEvent){
        if(oSplitEvent.target.value==="split Left")
        {
            gainNode.disconnect(0);
            panner.disconnect(0);
        
                splitter = audioCtx.createChannelSplitter(2);
                gainNode = audioCtx.createGain();
                soundSource.connect(splitter);
                
                gainNode.gain.setValueAtTime(2, audioCtx.currentTime);
                splitter.connect(gainNode,0);
                track.connect(gainNode).connect(audioCtx.destination);
                
                oSplitEvent.target.value="Stop";
                console.log(gainNode);
        }

        else{

            gainNode.disconnect();
            oSplitEvent.target.value="split Left";
            console.log(gainNode.disconnect());
        }

    }

    var splitmeR = document.getElementById("splitR");
    splitmeR.onclick= function(oSplitEvent){
        
        if(oSplitEvent.target.value==="split Right"){
            gainNode.disconnect();
            panner.disconnect();
        
                splitter = audioCtx.createChannelSplitter(2);
                        
                gainNode = audioCtx.createGain();
                soundSource.connect(splitter);
                    
                gainNode.gain.setValueAtTime(4, audioCtx.currentTime);
                splitter.connect(gainNode,1);

                track.connect(gainNode).connect(audioCtx.destination);
                oSplitEvent.target.value="Stop";
                console.log(gainNode);
        }

        else{
            gainNode.disconnect();
            oSplitEvent.target.value="split Right";
            console.log(gainNode);
        }

    }

    /*******Calling BiQuadFilter Function */

    var voiceSelect = document.getElementById("BiQuadFilter");

    voiceSelect.onchange = function (oEvent) {

        onBiquadFilter();
    };


/**********Selecting the Convolver Properties*******/

    var conv = document.getElementById("property");
    conv.onchange = function (ocChange) {

        if (ocChange.target.value === "reverb") {
            biquadFilter.disconnect(0);

            convolver.buffer = concertHallBuffer;
            track.connect(convolver).connect(audioCtx.destination);
        } else if (ocChange.target.value === "disablenormal") {
            
            biquadFilter.disconnect(0);
            convolver.disconnect(0);    
            convolver.normalize = false;
            track.connect(convolver).connect(audioCtx.destination);
        } else {
            console.log("No Property Selected");
            convolver.disconnect(0);
        }
    }

//*************** call for the Frequency Bar Graph ***********//

    function analyseBytes() {


        frequenz_bar_interval_id = setInterval(function () {
            var bufferLength = analyser.frequencyBinCount;
            var dataArray = new Uint8Array(bufferLength);
            analyser.getByteFrequencyData(dataArray);
            drawSound(dataArray);
        }, INTERVAL_REFRESH_MS_TIME);
    }
    ;
    clearRectangle();

    //selecting the waves function: Frequecy wave or sinuswave
    var visualSelect = document.getElementById("waves");
    var visualConv = document.getElementById("convolverwave");

    visualSelect.onchange = function (visEvent) {

        var WIDTH = 300;
        var HEIGHT = 400;
        if (visEvent.target.value === "frequencybars")



                //selecting the waves function: Frequecy wave or sinuswave

                {
                    
                    clearInterval(sinuswave_interval_id);
                    analyseBytes();
                } else if (visEvent.target.value === "sinewave") {

            clearInterval(frequenz_bar_interval_id);
           

            drawSinusWave();

        } else {




            clearInterval(frequenz_bar_interval_id);
            clearInterval(sinuswave_interval_id);
            clearRectangle();
            console.log("No graph selected");

        }

    };

                    
    function clearRectangle() {
        let canvasCtx = document.getElementById("audio_visual_player").getContext('2d');
        canvasCtx.clearRect(0, 0, 300, 400);
    }

    /**
     * draws the Audio Frequency Graph on a Canvas
     * @param bytes[] Array containg unsigned Bytes of the current Audiobuffer
     */
    function drawSound(dataArray) {

        let canvasCtx = document.getElementById("audio_visual_player").getContext('2d');
        canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        canvasCtx.fillRect(0, 0, 300, 400);
        analyser.fftSize = 256;

        let bufferLength = 128;

        var barWidth = (300 / bufferLength) * 2.5;
        var barHeight;
        var x = 0;

        for (var i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];

            var hue = i / analyser.frequencyBinCount * 360;


            canvasCtx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';



            canvasCtx.fillRect(x, 400 - barHeight / 2, barWidth, barHeight / 2);

            x += barWidth + 1;
        }

    }



    /**
     * Stops the Audio
     * 
     */
    function pauseAudio() {

        audioCtx.suspend();

        isPlaying = false;
        isPaused = true;
    }

    /**
     * Resumes the Audio
     * 
     */
    function resumeAudio() {


        audioCtx.resume();
		document.getElementById("player").play();

        isPaused = false;
        isPlaying = true;
    }

    /**
     * Mutes the Current Audio
     * 
     */
    function muteAudio() {



        gainNode.gain.value = 0;

        isMuted = true;
    }


    /**
     * Umutes the current Audio
     * 
     */
    function unmuteAudio() {


        gainNode.gain.value = 1;

        isMuted = false;
    }



    /**
     * Microphone Input
     */


    const player = document.getElementById('mic-player');

    var mic_analyser = null;
	var mic = false;
    $('#mic-btn').on('click', function (e) {
		mic = !mic;
		if(mic) document.getElementById("mic-btn").getElementsByTagName("i")[0].className="fa fa-microphone";
		else document.getElementById("mic-btn").getElementsByTagName("i")[0].className="fa fa-microphone-slash";

        MicAudioCtx = new (window.AudioContext || window.webkitAudioContext)();

        const source = MicAudioCtx.createMediaStreamSource(player.srcObject);
        const processor = MicAudioCtx.createScriptProcessor(512, 1, 1);

        mic_analyser = MicAudioCtx.createAnalyser();


        source.connect(processor).connect(mic_analyser);
        processor.connect(MicAudioCtx.destination);
		var first = false;
        processor.onaudioprocess = function (e) {
			if(!mic) return;
			// get the average for the first channel
			let float_arr = e.inputBuffer.getChannelData(0);

            //Converting float Array to Unsigned Byte Array in Order to send the Chunks to channel
            let byte_arr = new Uint8Array(float_arr);


			if (source.playbackState == source.PLAYING_STATE) {
				playByteArray(byte_arr);
			}
			/*
            let float_arr = e.inputBuffer.getChannelData(0);

            //Converting float Array to Unsigned Byte Array in Order to send the Chunks to channel
            let byte_arr = new Uint8Array(float_arr.buffer);

			var sum = 0;
			for(let i=0; i<byte_arr.length; i++) sum += byte_arr[i];
			if(sum > 260000) {
				playByteArray(byte_arr);
			}*/
			
			//websocket.send("m|"+decodeURI(byte_arr));

        };




    });



    const handleSuccess = function (stream) {
        if (window.URL) {
            player.srcObject = stream;
        } else {
            player.src = stream;
        }
    };

    navigator.mediaDevices.getUserMedia({audio: true, video: false})
            .then(handleSuccess);




    /*Stats for Nerds*/


    $('#nerd-stats-btn').on('click', function (e) {




        $('#detailaudio-tbl > tbody').html("");
        $('#byte-tbl > tbody').html("");

        //Output for Statistic
        $('#detailaudio-tbl > tbody').append("<tr><th>Sampling-Rate:</th><td>" + audioCtx.sampleRate + " Hz</td></tr>");
        $('#detailaudio-tbl > tbody').append("<tr><th>Base-Latency:</th><td>" + audioCtx.baseLatency + " </td></tr>");
        $('#detailaudio-tbl > tbody').append("<tr><th>Channel-Count:</th><td>" + audioCtx.destination.channelCount + " </td></tr>");
        $('#detailaudio-tbl > tbody').append("<tr><th>Max Channel-Count:</th><td>" + audioCtx.destination.maxChannelCount + " </td></tr>");
        $('#detailaudio-tbl > tbody').append("<tr><th>Channel Count Mode:</th><td>" + audioCtx.destination.channelCountMode + " </td></tr>");
        $('#detailaudio-tbl > tbody').append("<tr><th>Channel Interpretation:</th><td>" + audioCtx.destination.channelInterpretation + " </td></tr>");
        $('#detailaudio-tbl > tbody').append("<tr><th>Inputnumber:</th><td>" + audioCtx.destination.numberOfInputs + " </td></tr>");
        $('#detailaudio-tbl > tbody').append("<tr><th>Outputnumber:</th><td>" + audioCtx.destination.numberOfOutputs + " </td></tr>");
        $('#detailaudio-tbl > tbody').append("<tr><th>Fast Fourier Transform Size:</th><td>" + analyser.fftSize + " </td></tr>");
        $('#detailaudio-tbl > tbody').append("<tr><th>Bufferlength:</th><td>" + analyser.frequencyBinCount + " </td></tr>");






        setInterval(function (e) {

            $('#byte-tbl > tbody').html("");
            let bytearr = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(bytearr);


            for (let i = 0; i < bytearr.length - 8; i++) {



                $('#byte-tbl > tbody').append("<tr><td>" + bytearr[i] + "</td>" + "<td>" + bytearr[i + 1] + "</td>" + "<td>" + bytearr[i + 2] + "</td><td>" + bytearr[i + 3] + "</td><td>" + bytearr[i + 4] + "</td><td>" + bytearr[i + 5] + "</td><td>" + bytearr[i + 6] + "</td><td>" + bytearr[i + 7] + "</td></tr>");


            }


        }, 1000);

    });
