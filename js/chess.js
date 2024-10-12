// Initial chessboard setup
const initialBoard = [
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']
];

// Current game state
let boardState = JSON.parse(JSON.stringify(initialBoard));
let selectedPiece = null;
let turn = 'white'; // White moves first

// Create the chessboard and render pieces
function createBoard() {
    const board = document.getElementById('board');
    board.innerHTML = ''; // Clear previous board
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            let square = document.createElement('div');
            square.classList.add('square');
            square.dataset.row = row;
            square.dataset.col = col;

            let piece = boardState[row][col];
            if (piece) {
                const img = document.createElement('img');
                
                // Reference the correct image based on the piece code
                let pieceName = '';
                switch (piece) {
                    case 'R': pieceName = 'white_rook'; break;
                    case 'N': pieceName = 'white_knight'; break;
                    case 'B': pieceName = 'white_bishop'; break;
                    case 'Q': pieceName = 'white_queen'; break;
                    case 'K': pieceName = 'white_king'; break;
                    case 'P': pieceName = 'white_pawn'; break;
                    case 'r': pieceName = 'black_rook'; break;
                    case 'n': pieceName = 'black_knight'; break;
                    case 'b': pieceName = 'black_bishop'; break;
                    case 'q': pieceName = 'black_queen'; break;
                    case 'k': pieceName = 'black_king'; break;
                    case 'p': pieceName = 'black_pawn'; break;
                    default: break;
                }

                img.src = `images/${pieceName}.png`; // New image path
                img.alt = pieceName;
                square.appendChild(img);
            }
            square.addEventListener('click', handleSquareClick);
            board.appendChild(square);
        }
    }
}

// Handle square clicks (move pieces)
function handleSquareClick(event) {
    const row = parseInt(event.currentTarget.dataset.row);
    const col = parseInt(event.currentTarget.dataset.col);
    
    if (selectedPiece) {
        // Move the piece
        movePiece(selectedPiece.row, selectedPiece.col, row, col);
        selectedPiece = null;
    } else if (boardState[row][col]) {
        // Select a piece
        selectedPiece = { row, col };
    }
}

// Move piece logic
function movePiece(fromRow, fromCol, toRow, toCol) {
    const piece = boardState[fromRow][fromCol];

    // Basic validation (e.g., only move your own piece)
    if ((turn === 'white' && piece === piece.toLowerCase()) || (turn === 'black' && piece === piece.toUpperCase())) {
        alert('Not your turn');
        return;
    }

    // Make the move
    boardState[toRow][toCol] = piece;
    boardState[fromRow][fromCol] = null;

    // Switch turns
    turn = turn === 'white' ? 'black' : 'white';

    // Redraw the board
    createBoard();
}

// Reset the game
function resetGame() {
    boardState = JSON.parse(JSON.stringify(initialBoard));
    turn = 'white'; // White always starts
    createBoard();
}

// Initial render of the chessboard
createBoard();
