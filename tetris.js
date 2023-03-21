const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");
const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

ctx.scale(scale, scale);

let board = new Array(rows)
    .fill(null)
    .map(() => new Array(columns).fill(0));

let currentTetromino = createTetromino(randomTetrominoType());
let position = { x: Math.floor(columns / 2) - 1, y: 0 };
let dropCounter = 0;
let dropInterval = 1000;

function draw() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix(board, { x: 0, y: 0 });
    drawMatrix(currentTetromino.matrix, position);
}

function drawMatrix(matrix, offset) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x]) {
                ctx.fillStyle = currentTetromino.color;
                ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        }
    }
}

function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        dropTetromino();
    }

    draw();
    requestAnimationFrame(update);
}

function randomTetrominoType() {
    const types = "IOSTZJL";
    return types[Math.floor(Math.random() * types.length)];
}

function collide(board, tetromino, position) {
    const matrix = tetromino.matrix;
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (
                matrix[y][x] &&
                (board[y + position.y] &&
                    board[y + position.y][x + position.x]) !== 0
            ) {
                return true;
            }
        }
    }
    return false;
}

function merge(board, tetromino, position) {
    for (let y = 0; y < tetromino.matrix.length; y++) {
        for (let x = 0; x < tetromino.matrix[y].length; x++) {
            if (tetromino.matrix[y][x]) {
                board[y + position.y][x + position.x] = tetromino.matrix[y][x];
            }
        }
    }

    // Verifica y elimina las líneas completas
    for (let y = 0; y < rows; y++) {
        if (isLineComplete(board, y)) {
            removeLine(board, y);
        }
    }
}


function moveTetromino(dir) {
    position.x += dir;
    if (collide(board, currentTetromino, position)) {
        position.x -= dir;
    }
}

function dropTetromino(speedBoost = 1) {
    position.y++;
    if (collide(board, currentTetromino, position)) {
        position.y--;
        merge(board, currentTetromino, position);
        currentTetromino = createTetromino(randomTetrominoType());
        position.y = 0;
    }
    dropCounter = 0;
    dropInterval = 1000 / speedBoost;
}

function rotate(matrix) {
    const N = matrix.length - 1;
    const result = matrix.map((row, i) =>
        row.map((val, j) => matrix[N - j][i])
    );
    return result;
}

function rotateTetromino() {
    const prevMatrix = currentTetromino.matrix;
    currentTetromino.matrix = rotate(currentTetromino.matrix);

    if (collide(board, currentTetromino, position)) {
        currentTetromino.matrix = prevMatrix;
    }
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
        rotateTetromino();
    } else if (event.key === "ArrowLeft") {
        moveTetromino(-1);
    } else if (event.key === "ArrowRight") {
        moveTetromino(1);
    }
    else if (event.key === "ArrowDown") {
        dropTetromino(1)
    }
});

function isLineComplete(board, y) {
    return board[y].every((cell) => cell !== 0);
}

function removeLine(board, y) {
    board.splice(y, 1);
    board.unshift(new Array(columns).fill(0));
}



let lastTime = 0;
update();
