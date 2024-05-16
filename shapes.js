const width = 10;
const displayWidth = 4;

const lShapeRight = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
]
const lShapeLeft = [
    [1, 2, width+2, width*2+2],
    [2, width, width+1, width+2],
    [1, width+1, width*2+1, width*2+2],
    [0, 1, 2, width]
]
const zShapeRight = [
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1]
]
const zShapeLeft = [
    [width, width+1, width*2+1, width*2+2],
    [1, width, width+1, width*2],
    [width, width+1, width*2+1, width*2+2],
    [1, width, width+1, width*2],
]
const tShape = [
    [1, width, width+1, width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1, width, width+1, width*2+1]
]
const oShape = [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1]
]
const iShape = [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3]
]

const nextShapes = [
    [2, displayWidth+2, displayWidth*2+2, 3],                   //l right
    [1, 2, displayWidth+2, displayWidth*2+2],                   //l left
    [2, displayWidth+2, displayWidth+3, displayWidth*2+3],      //z right
    [2, displayWidth+1, displayWidth+2, displayWidth*2+1 ],     //z left
    [2, displayWidth+1, displayWidth+2, displayWidth+3],        //t
    [1,2, displayWidth+1, displayWidth+2],                      //o
    [2, displayWidth+2, displayWidth*2+2, displayWidth*3+2]     //i
]

const shapes = [lShapeRight, lShapeLeft, zShapeRight, zShapeLeft, tShape, oShape, iShape]
const colors = ["red", "yellow", "green", "purple", "blue"]

export {shapes, colors, nextShapes}
