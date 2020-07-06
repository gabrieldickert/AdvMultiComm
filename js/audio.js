$('document').ready(function (e) {

  var audioCtx = null;
  var analyser = null;
  var track = null;
  var gainNode = null;
  var panner = null;
  var biquadFilter = null;
  var convolver=null;
  var canvas_interval_id = null;
  var frequenz_bar_interval_id = null;
  var sinuswave_interval_id = null;
  var oscillator=null;
  var audio_times_interval_id = null;
  const INTERVAL_REFRESH_MS_TIME = 50;
  var isPaused = false;
  var isPlaying = false;
  var isMuted = false;





    //Addding Eventlistener on the Controlbutton
    $('#audio-control-play-btn').on('click', function (e) {



        if (isPlaying) {

            $(this).find("i").removeClass("fa fa-play");

            $(this).find("i").addClass("fa fa-pause");

            pauseAudio();

        } else if (isPaused) {


            $(this).find("i").removeClass("fa fa-pause");

            $(this).find("i").addClass("fa fa-play");

            resumeAudio();
        }

    });


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

            /*
            var WIDTH = 300;
            var HEIGHT = 400;
            let canvasCtx = document.getElementById("audio_visual_player").getContext('2d');
            analyser.fftSize = 2048;
            var bufferLength = analyser.fftSize;

            var dataArray = new Uint8Array(bufferLength);*/



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
  }


  /**
   * Inits a new Audio Context
   */
  function initAudioCtx() {

        panner.pan.value = $('#panner_slider').val();
        
        
        $('#s1').html($('#panner_slider').val());

        //onPanningChanged($('#panner_slider').val());
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    analyser = audioCtx.createAnalyser();

    //creating a biQuadFiltermethod for the BiquadFilterNode
    biquadFilter = audioCtx.createBiquadFilter();
    convolver=audioCtx.createConvolver();

    analyser.fftSize = 256;

    let audioElement = document.querySelector('audio');

    track = audioCtx.createMediaElementSource(audioElement);
    
    //Adding Nodes to the Audiocontext
    addVolumeToAudioCtx();
    addPanerToAudioCtx();
    onOscillation();



    // connect our graph
    track.connect(analyser).connect(gainNode).connect(panner).connect(biquadFilter)/*.connect(oscillator)*/.connect(audioCtx.destination);

  }

  function onOscillation(){

    oscillator=audioCtx.createOscillator();
    oscillator.connect(audioCtx.destination);
    //oscillator.start(0);
  }

  var oscw = document.getElementById("Oscillator_wave");
  oscw.onchange = function(oscwEvent){
  var val= oscwEvent.target.value;
  var freq= document.getElementById("freq");
  freq.value=val;
  oscillator.frequency.value=val;
    }

    /**
     * adds a Volumehanlder(Gain) to the AudioContext
     * @returns {undefined}
     */

    function addVolumeToAudioCtx() {
        gainNode = audioCtx.createGain();
        gainNode.gain.value = 0.5;
    }

var oscstart= document.getElementById("start");
oscstart.onclick = function(oscEvent)
{
  if (oscEvent.target.value==="start"){
    oscillator.start(0);
    oscEvent.target.value="stop";  
  }
  else
  {
  oscillator.stop(0);
  oscEvent.target.value="start";
  }
}
  



  
//-----------------Visualize Frequency Bar Graph--------------

  function analyseBytes() {

    frequenz_bar_interval_id = setInterval(function () {

      //analyser = audioCtx.createAnalyser();
      var bufferLength = analyser.frequencyBinCount;
      // console.log(bufferLength);
      var dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);
      //console.log(dataArray);
      drawSound(dataArray);
    }, 50);
  }
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





    }


//---------------Visualize Sinus Wave -----------------//

[13:17] Hitesh Shridhar
    

functiondrawSinusWave() {
 
sinuswave_interval_id = setInterval(function (e) {
 
console.log("SINUS");
 
      varWIDTH = 300;
      varHEIGHT = 400;
      letcanvasCtx =document.getElementById("audio_visual_player").getContext('2d');
analyser.fftSize = 2048;
      varbufferLength =analyser.fftSize;
console.log(bufferLength);
      vardataArray = newUint8Array(bufferLength);
 
canvasCtx.clearRect(0, 0,WIDTH,HEIGHT);
      //drawVisual = requestAnimationFrame(draw);
 
analyser.getByteTimeDomainData(dataArray);
 
canvasCtx.fillStyle = 'rgb(200, 200, 200)';
canvasCtx.fillRect(0, 0,WIDTH,HEIGHT);
 
canvasCtx.lineWidth = 2;
canvasCtx.strokeStyle = 'rgb(255, 0, 0)';
 
canvasCtx.beginPath();
 
      varsliceWidth =WIDTH * 1.0 / bufferLength;
      varx = 0;
 
for (vari = 0;i <bufferLength;i++) {
 
        varv =dataArray[i] / 128.0;
        vary =v *HEIGHT / 2;
 
        if (i === 0) {
canvasCtx.moveTo(x,y);
        } else {
canvasCtx.lineTo(x,y);
        }
 
x +=sliceWidth;
      }
 
canvasCtx.lineTo(canvasCtx.Width, canvasCtx.Height / 2);
canvasCtx.stroke();
 
    }, 50);
 
  }



                                        
                                        
                                        
                                        
//-----------Creating Biquad Filter Actions------------//
function onBiquadFilter() {


    biquadFilter.gain.setTargetAtTime(0, audioCtx.currentTime, 0)

            $('#audio-time-informs').html(Math.floor(current_time / 60) + ":" + current_time % 60 + "/" + Math.round(track_duration / 60) + ":" + (track_duration % 60));

            drawAudioProgressBar();

        }, INTERVAL_REFRESH_MS_TIME);

        //Calling the AnalyseBytes Function to Show the Audio
        analyseBytes();


    var voiceSetting = voiceSelect.value;
    console.log(voiceSetting);


   if (voiceSetting == "lowfrequency") {
      biquadFilter.type = "lowshelf";
      biquadFilter.frequency.setTargetAtTime(500, audioCtx.currentTime, 0)
      biquadFilter.gain.setTargetAtTime(25, audioCtx.currentTime, 0)
    } else if (voiceSetting == "highfrequency") {
      biquadFilter.type = "highshelf";
      biquadFilter.frequency.setTargetAtTime(1000, audioCtx.currentTime, 0)
      biquadFilter.gain.setTargetAtTime(25, audioCtx.currentTime, 0)
    } else {
      console.log("Voice settings turned off");

    }


    function analyseBytes() {


        frequenz_bar_interval_id = setInterval(function () {
            var bufferLength = analyser.frequencyBinCount;
            var dataArray = new Uint8Array(bufferLength);
            analyser.getByteFrequencyData(dataArray);
            drawSound(dataArray);
        }, INTERVAL_REFRESH_MS_TIME);
    }
  }


var voiceSelect = document.getElementById("BiQuadFilter");

voiceSelect.onchange = function (oEvent) {

    onBiquadFilter();
  };


//-------------Convolver Node---------------//

var soundSource;

ajaxRequest = new XMLHttpRequest();

ajaxRequest.open('GET', 'http://localhost/AMC_new/AdvMultiComm/server/music/birds.mp3', true);

ajaxRequest.responseType = 'arraybuffer';


ajaxRequest.onload = function() {
  var audioData = ajaxRequest.response;

  audioCtx.decodeAudioData(audioData, function(buffer) {
      soundSource = audioCtx.createBufferSource();
      convolver.buffer = buffer;
    }, function(e){ console.log("Error with decoding audio data" + e.err);});

    soundSource.connect(audioCtx.destination);
  //soundSource.loop = true;
 
};

ajaxRequest.send();

var conv= document.getElementById("property");
conv.onchange= function(ocChange){
  if(ocChange.target.value==="reverb"){
    biquadFilter.disconnect(0);
    soundSource.start();
    biquadFilter.connect(convolver);
  }
  else if (ocChange.target.value==="disablenormal"){
   
    biquadFilter.disconnect(0);
    soundSource.start();
    biquadFilter.connect(gainNode);
  }
  else{
    console.log("No Property Selected");
  }
}




  //selecting the waves function: Frequecy wave or sinuswave
  var visualSelect = document.getElementById("waves");

  visualSelect.onchange = function (visEvent) {
  
    var WIDTH = 300;
    var HEIGHT = 400;
        if (visEvent.target.value === "frequencybars")
        {
            //clearInterval(frequenz_bar_interval_id);
            clearInterval(sinuswave_interval_id);
            analyseBytes();

      if (visEvent.target.value === "frequencybars") {
      // clearInterval(frequenz_bar_interval_id);
      clearInterval(sinuswave_interval_id);
      analyseBytes();

      // console.log(canvas_interval_id);
    } else if (visEvent.target.value === "sinewave") {

      clearInterval(frequenz_bar_interval_id);
      //clearInterval(sinuswave_interval_id);

      drawSinusWave();

    } else {

      //TODO RESET CANVAS

      clearInterval(frequenz_bar_interval_id);
      clearInterval(sinuswave_interval_id);
      console.log("No graph selected");
    }

  }





    /**
     * draws the Audio on a Canvas
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

  

});