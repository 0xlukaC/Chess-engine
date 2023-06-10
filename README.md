# Chess-engine
This is a chess engine project, made for a programing class that implements common properties for a chess engine like the minimax algorithm with alpha-beta pruning and a somewhat detailed evaluation function. The engine is designed to play as a beginner - intermediate chess player, however, it is worth noting that the elo has not been tested for yet.

## Featrues
* Minimax Algorithm: The engine uses the minimax algorithm with alpha-beta pruning to search for the best move in the game tree. It considers various factors such as piece values, board position, king safety, and mobility to evaluate the positions.
* Alpha-Beta Pruning: The algorithm utilizes alpha-beta pruning to reduce the number of positions evaluated, resulting in more efficient searching and faster move decisions.
* Move Generation: The engine generates legal moves using the Chess.js library, which handles move validation, piece movement, and board state management.
* Evaluation Function: An evaluation function assigns a numerical score to a given board position based on different criteria such as material balance, piece activity, king safety, and pawn structure.
* Endgame Specific Evaluation: The evaluation function includes specific criteria for endgame scenarios, favoring positions that aim to deliver checkmate and restrict opponent king's mobility.
* User Interface: Asthetic interface (seen below)


![image](https://github.com/cyber-chalk/Chess-engine/assets/52194915/5cf0b857-066b-4837-af8e-9a8b586d430c)
