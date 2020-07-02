$('document').ready(function (e) {





    /**
     * Global Variables
     * 
     */
    var audioCtx = null;
    var analyser = null;
    var track = null;
    var gainNode = null;
    var panner = null;
    var track = null;

    initCanvasForAudioPreview();



    $('#inner_playlist').on('click', function (e) {

        initAudioCtx();

    });


    /*$('#init-btn').on('click', function (e) {
     
     console.log("Button Click");
     initAudioCtx();
     
     });*/



    $('#volume_slider').on('input', function (e) {



        var current_val = $('#volume_slider').val();
        var applied_gain = current_val / 100;


        gainNode.gain.value = applied_gain;



    });


    $('#panner_slider').on('input', function (e) {

        onPanningChanged($('#panner_slider').val());


    });


    $('#lowpass_slider').on('input', function (e) {


        stop();
    });




    /**
     *  Adds a Paner to the AudioContext
     */

    function addPanerToAudioCtx() {


        let pannerOption = {pan: 0};

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

    /**
     * Applies the panning Volume to the Audiocontext
     * @param float 
     */
    function onPanningChanged(value) {

        panner.pan.value = value;



    }



    /**
     * Inits a new Audio Context
     */
    function initAudioCtx() {



        if (audioCtx == null) {



            audioCtx = new (window.AudioContext || window.webkitAudioContext)();

            analyser = audioCtx.createAnalyser();

            analyser.fftSize = 256;

            let  audioElement = document.querySelector('audio');

            track = audioCtx.createMediaElementSource(audioElement);

            //Adding Nodes to the Audiocontext
            addVolumeToAudioCtx();
            addPanerToAudioCtx();

            // connect our graph
            track.connect(analyser).connect(gainNode).connect(panner).connect(audioCtx.destination);

            analyseBytes();

        }





    }



    function stopAudio() {

        audioCtx.suspend();
    }


    function resumeAudio() {


        audioCtx.resume();
    }



    function analyseBytes() {

        setInterval(function () {
            var bufferLength = analyser.frequencyBinCount;
            // console.log(bufferLength);
            var dataArray = new Uint8Array(bufferLength);
            analyser.getByteFrequencyData(dataArray);
            // console.log(dataArray);
            drawSound(dataArray);
        }, 50);
    }




    function initCanvasForAudioPreview() {

     
        let width = 300;
        let height = 150;
        let canvasCtx = document.getElementById("audio_visual_player").getContext('2d');
        canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        canvasCtx.fillRect(0, 0, width, height);

    }

    /**
     * Draws a simple Visualizer for the Audio
     * @param array Array containing unsigned Bytes from the current Audiostream
     * @returns {undefined}
     */
    function drawSound(dataArray) {

        let width = 300;
        let height = 150;

        let canvasCtx = document.getElementById("audio_visual_player").getContext('2d');
        canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        canvasCtx.fillRect(0, 0, width, height);
        let bufferLength = 128;
        var barWidth = (300 / bufferLength) * 2.5;
        var barHeight;
        var x = 0;

        for (var i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];

            canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',' + (barHeight / 1.5 + 70) + ',' + (barHeight / 2 + 30) + ')';
            canvasCtx.fillRect(x, height - barHeight / 2, barWidth, barHeight / 2);

            x += barWidth + 1;
        }







    }



});