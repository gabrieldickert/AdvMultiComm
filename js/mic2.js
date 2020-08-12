 //1)   
   const startRecording = document.getElementById('start-recording');
   const stopRecording = document.getElementById('stop-recording');
   let recordAudio;
 
   //2)
   const socketio = io();
   const socket = socketio.on('connect', function() {
       startRecording.disabled = false;
   });
 
   //3)
   startRecording.onclick = function() {
       startRecording.disabled = true;
 
       //4)
       navigator.getUserMedia({
           audio: true
       }, function(stream) {
 
               //5)
               recordAudio = RecordRTC(stream, {
                   type: 'audio',
 
               //6)
                   mimeType: 'audio/webm',
                   sampleRate: 44100,
                   // used by StereoAudioRecorder
                   // the range 22050 to 96000.
                   // let us force 16khz recording:
                   desiredSampRate: 16000,
                
                   // MediaStreamRecorder, StereoAudioRecorder, WebAssemblyRecorder
                   // CanvasRecorder, GifRecorder, WhammyRecorder
                   recorderType: StereoAudioRecorder,
                   // Dialogflow / STT requires mono audio
                   numberOfAudioChannels: 1
           });
 
           recordAudio.startRecording();
           stopRecording.disabled = false;
       }, function(error) {
           console.error(JSON.stringify(error));
       });
   };