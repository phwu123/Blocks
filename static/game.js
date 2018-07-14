const socket = io();
socket.on('message', (data) => {
  console.log('dataa ', data);
});
const fps = 60

const movement = {
  up: false,
  down: false,
  left: false,
  right: false,
}
document.addEventListener('keydown', (e) => {
  if (e.keyCode === 65) movement.left = true;
  if (e.keyCode === 87) movement.up = true;
  if (e.keyCode === 68) movement.right = true;
  if (e.keyCode === 83) movement.down = true;
})

document.addEventListener('keyup', (e) => {
  if (e.keyCode === 65) movement.left = false;
  if (e.keyCode === 87) movement.up = false;
  if (e.keyCode === 68) movement.right = false;
  if (e.keyCode === 83) movement.down = false;
})

socket.emit('new player');
setInterval(() => {
  socket.emit('movement', movement);
}, 1000 / fps)

