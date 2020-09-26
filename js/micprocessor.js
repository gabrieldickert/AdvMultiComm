var ws_mic = new WebSocket("wss://" + window.location.host + ":3001");
ws_mic.onopen = function (ev) {

    ws_mic.send("m|" + "sss");

};

ws_mic.onmessage = function (ev) {


    let audioBlob = ev.data;
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);

    audio.play();

};
const sleep = time => new Promise(resolve => setTimeout(resolve, time));
navigator.mediaDevices.getUserMedia({audio: true}).then(async function (stream) {

    let mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = function (e) {


        ws_mic.send(e.data);

    };

    while(true) {
            mediaRecorder.start();

    await sleep(150);
    mediaRecorder.stop();


        
    }



});
