const width = 10;
const displayWidth = 4;

const lTetrominoRight = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
]
const lTetrominoLeft = [
    [1, 2, width+2, width*2+2],
    [2, width, width+1, width+2],
    [1, width+1, width*2+1, width*2+2],
    [0, 1, 2, width]
]
const zTetrominoRight = [
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1]
]
const zTetrominoLeft = [
    [width, width+1, width*2+1, width*2+2],
    [1, width, width+1, width*2],
    [width, width+1, width*2+1, width*2+2],
    [1, width, width+1, width*2],
]
const tTetromino = [
    [1, width, width+1, width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1, width, width+1, width*2+1]
]
const oTetromino = [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1]
]
const iTetromino = [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3]
]

const nextTetrominoes = [
    [2, displayWidth+2, displayWidth*2+2, 3],                   //l right
    [1, 2, displayWidth+2, displayWidth*2+2],                   //l left
    [2, displayWidth+2, displayWidth+3, displayWidth*2+3],      //z right
    [2, displayWidth+1, displayWidth+2, displayWidth*2+1 ],     //z left
    [2, displayWidth+1, displayWidth+2, displayWidth+3],        //t
    [1,2, displayWidth+1, displayWidth+2],                      //o
    [2, displayWidth+2, displayWidth*2+2, displayWidth*3+2]     //i
]

const tetrominoes = [lTetrominoRight, lTetrominoLeft, zTetrominoRight, zTetrominoLeft, tTetromino, oTetromino, iTetromino]
const colors = ["red", "yellow", "green", "purple", "blue"]

export {tetrominoes, colors, nextTetrominoes}
