$('document').ready(function (e) {






    var audioCtx = null;



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

    /**
     * Inits a new Audio Context
     */
    function initAudioCtx() {


        audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        let  audioElement = document.querySelector('audio');


        console.log(audioElement);
        let track = audioCtx.createMediaElementSource(audioElement);


        var gainNode = audioCtx.createGain();


        gainNode.gain.value = 0.1;


        // connect our graph
        track.connect(gainNode).connect(audioCtx.destination);

        //console.log(audioCtx);


        // var gainNode = audioCtx.createGain();

        //gainNode.gain.value = 0.5;




    }


    //  var gainNode = audioCtx.createGain();
    //  gainNode.gain.value = 0.5;




});