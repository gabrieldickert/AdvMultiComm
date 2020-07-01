$('document').ready(function (e) {






    var audioCtx = null;
    var analyser = null;
    var track = null;
    var gainNode = null;
    var panner = null;



    // const context = new AudioContext();

    /*   function playSound() {
     const source = context.createBufferSource();
     source.buffer = dogBarkingBuffer;
     source.connect(context.destination);
     source.start(0);
     }*/




    $('#init-btn').on('click', function (e) {

        console.log("Button Click");
        initAudioCtx();

    });


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


    function onPanningChanged(value) {

        panner.pan.value = value;



    }

    /**
     * Inits a new Audio Context
     */
    function initAudioCtx() {


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




    }


    function analyseBytes() {


        //const source = audioCtx.createMediaStreamSource( document.querySelector('audio'));


        //console.log(source);







        setInterval(function () {
            var bufferLength = analyser.frequencyBinCount;
           // console.log(bufferLength);
            var dataArray = new Uint8Array(bufferLength);


            analyser.getByteFrequencyData(dataArray);
            console.log(dataArray);
            drawSound(dataArray);
        }, 50);
        //get the latest buffer that should play next
        // source.buffer = audiobuffer.shift();
        // source.connect(context.destination);


        //var analyser = audioCtx.createAnalyser();
        //var dataArray = new Uint8Array(analyser.frequencyBinCount); // Uint8Array should be the same length as the frequencyBinCount 



        // void analyser.getByteFrequencyData(dataArray); // fill the


        ///console.log(dataArray);
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

            canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ','+ (barHeight + 100)+','+ (barHeight + 100)+')';
            canvasCtx.fillRect(x, 400 - barHeight / 2, barWidth, barHeight / 2);

            x += barWidth + 1;
        }







    }



});