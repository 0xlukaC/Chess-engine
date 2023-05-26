const { chess } = require("chess.js");
// const chess = new Chess() // start the game

// const pawnV = 100;
// const knightV = 300;
// const bishopV = 320; //slightly better than the knight
// const rookV = 500;
// const queenV = 900;

const chess = new chess();

while (!chess.isGameOver()) {
	evaluate(chess.board());

	const move = moves[Math.floor(Math.random() * moves.length)];
	chess.move(move);
}
console.log(chess.pgn());

function evaluate(position) {
	let eval = 0;
	queenV * 5;
}

const reverseArray = function (array) {
	return array.slice().reverse();
}; // flips the peice square table so it matches the black side

const pawnVW = [
	[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
	[5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
	[1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
	[0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
	[0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
	[0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
	[0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
	[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
];

const pawnVB = reverseArray(pawnVW);

const knightV = [
	[-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
	[-4.0, -2.0, 0.0, 0.0, 0.0, 0.0, -2.0, -4.0],
	[-3.0, 0.0, 1.0, 1.5, 1.5, 1.0, 0.0, -3.0],
	[-3.0, 0.5, 1.5, 2.0, 2.0, 1.5, 0.5, -3.0],
	[-3.0, 0.0, 1.5, 2.0, 2.0, 1.5, 0.0, -3.0],
	[-3.0, 0.5, 1.0, 1.5, 1.5, 1.0, 0.5, -3.0],
	[-4.0, -2.0, 0.0, 0.5, 0.5, 0.0, -2.0, -4.0],
	[-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
]; // doesnt need the reverse func because its symmetrical

const bishopVW = [
	[-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
	[-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
	[-1.0, 0.0, 0.5, 1.0, 1.0, 0.5, 0.0, -1.0],
	[-1.0, 0.5, 0.5, 1.0, 1.0, 0.5, 0.5, -1.0],
	[-1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, -1.0],
	[-1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0],
	[-1.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, -1.0],
	[-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
];

const bishopVB = reverseArray(bishopVW);

const rook = [
	[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
	[0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5],
	[-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
	[-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
	[-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
	[-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
	[-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
	[0.0, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0]
];

var rookEvalBlack = reverseArray(rookEvalWhite);

var evalQueen = [
	[-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
	[-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
	[-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
	[-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
	[0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
	[-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
	[-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
	[-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
];

var kingEvalWhite = [
	[-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
	[-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
	[-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
	[-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
	[-2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
	[-1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
	[2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0],
	[2.0, 3.0, 1.0, 0.0, 0.0, 1.0, 3.0, 2.0]
];

var kingEvalBlack = reverseArray(kingEvalWhite);
