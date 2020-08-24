
var inComingData = false;
var ws_mic = new WebSocket("ws://" + window.location.host + ":3001");
ws_mic.onopen = function (ev) {

    //   ws_mic.send("m|" + "sss");
    ws_mic.send("c|" + channelID);




};

ws_mic.onmessage = function (ev) {




    if (ev.data == channelID) {
        
   


        inComingData = true;

    } else {


        if (inComingData) {

            let audioBlob = ev.data;
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);

            audio.play();

            inComingData = false;


        }

    }



};
const sleep = time => new Promise(resolve => setTimeout(resolve, time));
navigator.mediaDevices.getUserMedia({audio: true}).then(async function (stream) {

    let mediaRecorder = new MediaRecorder(stream);
    let audioChunks = [];



    mediaRecorder.ondataavailable = function (e) {


        // let channelID = parseInt(getParam("id"));

        ws_mic.send("b|" + channelID);
        ws_mic.send(e.data);

        // ws_mic.send(e.data);

    };





    while (true) {
        mediaRecorder.start();

        await sleep(250);
        mediaRecorder.stop();



    }



});
