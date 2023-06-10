const socket = new WebSocket("ws://localhost:3001");

// Connection opened
socket.addEventListener("open", (event) => {
	console.log("opened");
});

// Listen for messages
socket.addEventListener("message", (event) => {
	if (event.data == "0") return;
	return board.position(event.data);
});

// chess
let currentPosition;
let onDragStart = (source, piece, position, orientation) =>
	(currentPosition = position);

function onDrop(source, target, piece) {
	console.log(source, target, piece);
	if (target == "offboard") return "snapback";

	socket.send(source + " " + target);

	socket.addEventListener("message", (event) => {
		console.log(event.data);
		if (event.data == "0") return board.position(currentPosition);
	});
}

let config = {
	position: "start",
	draggable: true,
	onDragStart: onDragStart,
	onDrop: onDrop
};

let board = Chessboard("myBoard", config);
