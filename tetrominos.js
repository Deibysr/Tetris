const tetrominos = {
    I: {
        shape: [
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
        color: 'cyan',
    },
    O: {
        shape: [
            [2, 2],
            [2, 2],
        ],
        color: 'yellow',
    },
    T: {
        shape: [
            [0, 3, 0],
            [3, 3, 3],
            [0, 0, 0],
        ],
        color: 'purple',
    },
    S: {
        shape: [
            [0, 4, 4],
            [4, 4, 0],
            [0, 0, 0],
        ],
        color: 'green',
    },
    Z: {
        shape: [
            [5, 5, 0],
            [0, 5, 5],
            [0, 0, 0],
        ],
        color: 'red',
    },
    J: {
        shape: [
            [6, 0, 0],
            [6, 6, 6],
            [0, 0, 0],
        ],
        color: 'blue',
    },
    L: {
        shape: [
            [0, 0, 7],
            [7, 7, 7],
            [0, 0, 0],
        ],
        color: 'orange',
    },
};

function rotate(matrix) {
    const N = matrix.length - 1;
    const result = matrix.map((row, i) => row.map((val, j) => matrix[N - j][i]));
    return result;
}

function createTetromino(type) {
    return {
        matrix: tetrominos[type].shape,
        color: tetrominos[type].color,
    };
}
