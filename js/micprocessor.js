
var inComingData = false;

var isMicMuted = true;
var isMicAudioMuted = false;
var ws_mic = new WebSocket("wss://" + window.location.host + ":3001");
ws_mic.onopen = function (ev) {

    //   ws_mic.send("m|" + "sss");
    ws_mic.send("c|" + channelID);




};



$('#mic-btn').on('click', function (e) {




    if ($('#mic-btn > i').hasClass("fa fa-microphone-slash")) {
        $('#mic-btn > i').removeClass("fa fa-microphone-slash");
        $('#mic-btn > i').addClass("fa fa-microphone");

        isMicMuted = false;

    } else {
        $('#mic-btn > i').removeClass("fa fa-microphone");
        $('#mic-btn > i').addClass("fa fa-microphone-slash");

        isMicMuted = true;


    }

    //console.log(    $('#mic-btn > i').hasClass("fa fa-microphone-slash"));
    // console.log("MIC");
});

ws_mic.onmessage = function (ev) {
	if(ev.data == null || ev.data.length == 0) return;
	let audioBlob = ev.data;
	const audioUrl = URL.createObjectURL(audioBlob);
	const audio = new Audio(audioUrl);
	audio.play();
};
const sleep = time => new Promise(resolve => setTimeout(resolve, time));
navigator.mediaDevices.getUserMedia({audio: true}).then(async function (stream) {

    let mediaRecorder = new MediaRecorder(stream);
    let audioChunks = [];



    mediaRecorder.ondataavailable = function (e) {


        // let channelID = parseInt(getParam("id"));


        if (!isMicMuted) {

            ws_mic.send("b|" + channelID);
            ws_mic.send(e.data);

        }


        // ws_mic.send(e.data);

    };





    while (true) {





        mediaRecorder.start();

        await sleep(250);
        mediaRecorder.stop();





    }



});
