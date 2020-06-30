$('document').ready(function (e) {






    var audioCtx = null;
    var track = null;
    var gainNode = null;



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

        var current_val = $('#volume_slider').val();
        var applied_gain = current_val / 100;


        gainNode.gain.value = applied_gain;

        track.connect(gainNode).connect(audioCtx.destination);









    });




    function addVolumeToAudioCtx() {
        gainNode = audioCtx.createGain();
        gainNode.gain.value = 1;
    }



    function onVolumeChanged(value) {

        gainNode.gain.value = 0.1;


        console.log("Volume Change");




    }

    /**
     * Inits a new Audio Context
     */
    function initAudioCtx() {


        audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        let  audioElement = document.querySelector('audio');


        track = audioCtx.createMediaElementSource(audioElement);

        addVolumeToAudioCtx();

        // connect our graph
        track.connect(gainNode).connect(audioCtx.destination);

        //console.log(audioCtx);


        // var gainNode = audioCtx.createGain();

        //gainNode.gain.value = 0.5;




    }


    //  var gainNode = audioCtx.createGain();
    //  gainNode.gain.value = 0.5;




});