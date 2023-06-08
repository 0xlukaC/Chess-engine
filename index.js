const express = require("express");
const app = express();

app.use(express.static("public")); // uses the public folder for static files

app.listen(3000);

const { Chess } = require("chess.js");
const chess = new Chess(); // start the game
// console.log(chess.board());

// minimax
let bestMove = null;
function mover() {
	let search = minimax(chess.board(), 3, -Infinity, +Infinity, false);
	chess.move(bestMove);
	return chess.fen();
}

function minimax(position, depth, alpha, beta, maximizingPlayer) {
	if (depth == 0 || chess.isGameOver()) return evaluate(position);
	// Math.ceil(Math.random() * 99) * (Math.round(Math.random()) ? 1 : -1)
	if (maximizingPlayer) {
		let maxEval = -Infinity;
		let currentBestMove;

		for (let i = 0; i < chess.moves().length; i++) {
			chess.move(chess.moves()[i]);
			let child = chess.board();

			let bestEval = minimax(child, depth - 1, alpha, beta, false);
			maxEval = Math.max(maxEval, bestEval);

			if (bestEval == maxEval) currentBestMove = chess.moves()[i];
			chess.undo();

			alpha = Math.max(alpha, bestEval);
			if (beta <= alpha) break;
		}

		bestMove = currentBestMove;
		return maxEval;
	} else {
		let minEval = +Infinity;

		for (let i = 0; i < chess.moves().length; i++) {
			chess.move(chess.moves()[i]);
			let child = chess.board();

			let bestEval = minimax(child, depth - 1, alpha, beta, true);
			minEval = Math.min(minEval, bestEval);

			chess.undo();

			beta = Math.min(beta, bestEval);
			if (beta <= alpha) break;
		}
		return minEval;
	}
}

//eval

let reverseArray = (array) => array.slice().reverse();
// flips the peice square table so it matches the black side

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

const rookVW = [
	[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
	[0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5],
	[-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
	[-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
	[-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
	[-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
	[-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
	[0.0, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0]
];

const rookVB = reverseArray(rookVW);

const queenV = [
	[-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
	[-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
	[-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
	[-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
	[0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
	[-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
	[-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
	[-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
];

const kingVW = [
	[-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
	[-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
	[-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
	[-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
	[-2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
	[-1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
	[2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0],
	[2.0, 3.0, 1.0, 0.0, 0.0, 1.0, 3.0, 2.0]
];

const kingVB = reverseArray(kingVW);

const piece_values = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 20 };

const position_valuesW = {
	p: pawnVW,
	n: knightV,
	b: bishopVW,
	r: rookVW,
	q: queenV,
	k: kingVW
};
const position_valuesB = {
	p: pawnVB,
	n: knightV,
	b: bishopVB,
	r: rookVB,
	q: queenV,
	k: kingVB
};

// Evaluation function
//
//
// isolated pawns
// 1. loop through and pick out pawns
// 2. record weather the row had a pawn last space (starts off false)
// 3. check if that was the case if not just continue, if yes, make another variable and have it record another pawn
// 4. next iteration, if there is no pawn then it is a isolated pawn

//

// passed pawns
// 1. loop through and pick out pawns
// 2. add a point to respected column if there is a white pawn or make it a large negative number
// 4. go through and check if the file was negative or positive and score off that

function evaluate(position) {
	let eval = 0;
	let materialLeft = 0;
	// for doubled pawns
	let doubledTable = {
		a: 0,
		b: 0,
		c: 0,
		d: 0,
		e: 0,
		f: 0,
		g: 0,
		h: 0
	};

	let kingTable = { w: undefined, b: undefined };

	let passedTable = {
		a: 0,
		b: 0,
		c: 0,
		d: 0,
		e: 0,
		f: 0,
		g: 0,
		h: 0
	};

	//loop through every peice
	for (let i = 0; i < 8; i++) {
		let pawnLastMove = false;
		let pawnThisMove = false;

		for (let j = 0; j < 8; j++) {
			let currentSquare = position[i][j];

			if (currentSquare === null) {
				eval += isolated(pawnLastMove, pawnThisMove, false, null);
				pawnLastMove = pawnThisMove;
				pawnThisMove = false;
				continue;
			}

			materialLeft += piece_values[currentSquare.type]; //needs fixing

			if (currentSquare.type == "k")
				kingTable[currentSquare.color] = [currentSquare, [i, j]];

			if (currentSquare.type == "p") {
				// for doubled and isolated pawns

				eval += isolated(
					pawnLastMove,
					pawnThisMove,
					true,
					currentSquare.color
				);
				pawnLastMove = pawnThisMove;
				pawnThisMove = true;

				if (currentSquare.color == "w") {
					doubledTable[currentSquare.square[0]] -= 5;
					passedTable[currentSquare.square[0]] += 1;
				} else {
					doubledTable[currentSquare.square[0]] += 5;
					passedTable[currentSquare.square[0]] += -1;
				}
			} else {
				eval += isolated(
					pawnLastMove,
					pawnThisMove,
					false,
					currentSquare.color
				);
				pawnLastMove = pawnThisMove;
				pawnLastMove = false;
			}

			eval += getPieceValue(currentSquare, i, j);

			// returns peice (square, type and colour) and  x and y coords
		}
	}

	for (let column in doubledTable) {
		eval += doubledTable[column];
	}

	for (let column in passedTable) {
		if (passedTable[column] < 0) eval += 6;
		else if (passedTable[column] > 0) eval -= 6;
	}

	// console.log(materialLeft);
	if (materialLeft <= 15) eval += avengersEndgame(materialLeft);

	return eval;
}

function isolated(last, scndLast, current, color) {
	let multi = 1;
	if (color == "b") {
		multi = -1;
	}
	if (!last && !scndLast && current) return -1 * multi;
	else return 0;
}

function getPieceValue(peice, x, y) {
	let peiceV = piece_values[peice.type];

	let positionV;
	if (peice.color == "w") {
		positionV = position_valuesW[peice.type][x][y];
		// console.log(peiceV, positionV);
		return positionV + peiceV;
	} else {
		positionV = position_valuesB[peice.type][x][y];
		// console.log(peiceV, positionV, "black");
		return (positionV + peiceV) * -1;
	}
}

function avengersEndgame(endgameWeight) {
	// endgame specific eval
	if (!kingTable.w || !kingTable.b) return 0;
	let endEval = 0;

	// favour positions where opponent king has been forced away from the center (to the edge of the board)
	// making it easier to deliver checkmate
	let blackKingRank = kingTable.b[1][0];
	let blackKingFile = kingTable.b[1][1];

	let whiteKingRank = kingTable.w[1][0];
	let whiteKingFile = kingTable.w[1][1];

	endEval +=
		Math.max(3 - blackKingRank, blackKingFile - 4) +
		Math.max(3 - blackKingRank, blackKingRank - 4);

	endEval -=
		Math.max(3 - whiteKingFile, whiteKingFile - 4) +
		Math.max(3 - whiteKingRank, whiteKingRank - 4);

	// incentivize moving the king closer to opponent king to cut off escape and assist with checkmate
	endEval +=
		Math.abs(whiteKingFile - blackKingFile) +
		Math.abs(whiteKingRank - blackKingRank);

	//maybe add 14 - math.abs...

	return endEval - endgameWeight / 2;
}

// console.log(evaluate(chess.board()));
// move();

// import { WebSocketServer } from "ws";
let { WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", function connection(ws) {
	ws.on("error", console.error);

	ws.on("message", function message(data) {
		data = data.toString().split(" ");
		console.log("data", data);

		// [ 'g1', 'f3', 'Ng1', 'Nf3' ]
		// [ 'g1', 'f3' ] for pawns

		// check if there is a peice on that square and add "x"
		if (chess.isGameOver()) return ws.send(0);
		if (chess.turn == "b") return ws.send(0);

		let legal = false;
		let possibles = chess.moves({ square: data[0] });

		let checker = data[3];
		if (data[3] == undefined) checker = data[1];

		// if (chess.get(data[1]).color == "b") {

		// }

		console.log("possibles", possibles);
		for (let i = 0; i < possibles.length; i++) {
			console.log("single possible", possibles[i]);
			if (possibles[i] == checker) legal = true;
		}
		if (!legal) return ws.send(0);
		chess.move(checker);
		console.log(chess.ascii());
		ws.send(mover());
		// check for check or maybe illigal move
	});
});
