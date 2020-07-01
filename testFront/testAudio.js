const context = new AudioContext();

function playSound() {
  const source = context.createBufferSource();
  source.buffer = dogBarkingBuffer;
  source.connect(context.destination);
  source.start(0);
}