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


  //Initializing the init Button

  $('#init-btn').on('click', function (e) {

    console.log("Button Click");
    initAudioCtx();
  });

  //calling the graph on the volume and changing the volume
  $('#volume_slider').on('input', function (e) {

    analyseBytes();

    var current_val = $('#volume_slider').val();
    var applied_gain = current_val / 100;


    gainNode.gain.value = applied_gain;

    //track.connect(gainNode).connect(audioCtx.destination);


  });


  $('#panner_slider').on('input', function (e) {

    onPanningChanged($('#panner_slider').val());


  });




  /**
   *  Adds a Paner to the AudioContext
   */

  function addPanerToAudioCtx() {


    let pannerOption = { pan: 0 };

    panner = new StereoPannerNode(audioCtx, pannerOption);

    panner.pan.Value = 0;
  }

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
    console.log("Volume Change");
  }

  function onPanningChanged(value) {

    panner.pan.value = value;
  }

  /**
   * Inits a new Audio Context
   */
  function initAudioCtx() {

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

  
 // oscillator.stop(1);

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

//---------------Visualize Sinus Wave -----------------//

  function drawSinusWave() {

    sinuswave_interval_id = setInterval(function (e) {

      console.log("SINUS");

      var WIDTH = 300;
      var HEIGHT = 400;
      let canvasCtx = document.getElementById("audio_visual_player").getContext('2d');
      analyser.fftSize = 2048;
      var bufferLength = analyser.fftSize;
      console.log(bufferLength);
      var dataArray = new Uint8Array(bufferLength);

      canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
      //drawVisual = requestAnimationFrame(draw);

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

    }, 50);

  }

//-----------Creating Biquad Filter Actions------------//
function onBiquadFilter() {

    biquadFilter.gain.setTargetAtTime(0, audioCtx.currentTime, 0)

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



  function drawSound(dataArray) {

    let canvasCtx = document.getElementById("audio_visual_player").getContext('2d');
    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, 300, 400);


    let bufferLength = 128;

    var barWidth = (300 / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    for (var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];

      canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',' + (barHeight + 100) + ',' + (barHeight + 100) + ')';
      canvasCtx.fillRect(x, 400 - barHeight / 2, barWidth, barHeight / 2);

      x += barWidth + 1;
    }

  }

});