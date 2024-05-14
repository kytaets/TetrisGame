document.addEventListener('DOMContentLoaded', () =>{
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score')
    const startBtn = document.querySelector('#start-btn')
    const width = 10;
    let nextRandom = 0;
    let timerId
    let score = 0

    //The Tetrominoes
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]
    const zTetromino = [
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1]
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
    

    const tetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

    let currentPosition = 4
    let currentRotation = 0

    //choosing random tetromino
    let random = Math.floor(Math.random()*tetrominoes.length)
    let current = tetrominoes[random][currentRotation]

    //draw the tetramino
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
    }

    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }

    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freeze()
    }

    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
            current.forEach(index => {
                squares[currentPosition + index].classList.add("taken")
            })
            random = nextRandom
            nextRandom = Math.floor(Math.random() * tetrominoes.length)
            current = tetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
            addScore()
            gameOver()
        }
    }

    function moveLeft(){
        undraw()
        const isEdge = current.some(index => 
            (currentPosition + index) % width === 0
        )

        if (!isEdge) 
            currentPosition -=1
        if(current.some(index => squares[currentPosition + index].classList.contains("taken")))
            currentPosition +=1

        draw()
    }
    
    function moveRight(){
        undraw()
        const isEdge = current.some(index => 
            (currentPosition + index + 1) % width === 0
        )
        
        if (!isEdge) 
            currentPosition +=1
        if(current.some(index => squares[currentPosition + index].classList.contains("taken")))
            currentPosition -=1

        draw()
    }

    function rotate() {
        undraw()
        currentRotation++
        if(currentRotation === current.length){
            currentRotation = 0
        }
        current = tetrominoes[random][currentRotation]
        draw()
    }

    document.addEventListener("keypress", (event) => {
        const pressedKey = event.key
        console.log(pressedKey)
        if(pressedKey === "a"){
            moveLeft()
        }
        if(pressedKey === "d"){
            moveRight()
        }
        if(pressedKey === "s"){
            moveDown()
        }
        if(pressedKey === "w"){
            rotate()
        }
        
    })


    const displaySquare = document.querySelectorAll('.mini-grid div')
    const displayWidth = 4
    let displayIndex = 0

    const nextTetrominoes = [
        [2, displayWidth+2, displayWidth*2+2, 3],                   //l
        [2, displayWidth+2, displayWidth+3, displayWidth*2+3],      //z
        [1, displayWidth, displayWidth+1, displayWidth+2],          //t
        [1,2, displayWidth+1, displayWidth+2],                      //o
        [2, displayWidth+2, displayWidth*2+2, displayWidth*3+2]     //i
    ]


    function displayShape() {
        displaySquare.forEach(square => {
            square.classList.remove('tetromino')
        })
        nextTetrominoes[nextRandom].forEach(index => {
            displaySquare[displayIndex + index].classList.add('tetromino')
        })
    }

    startBtn.addEventListener('click', () => {
        if(timerId) {
            clearInterval(timerId)
            timerId = null
        }
        else {
            draw()
            timerId = setInterval(moveDown, 500)
            nextRandom = Math.floor(Math.random() * tetrominoes.length)
            displayShape()
        }
    })

    function addScore() {
        for(let i = 0; i < 199; i+=width) {
            const row = [i,i+1,i+2,i+3,i+4,i+5,i+6,i+7,i+8,i+9]

            if(row.every(index => squares[index].classList.contains('taken'))) {
                score += 10
                scoreDisplay.innerHTML = score
                row.forEach(index => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('tetromino')
                })
                const squaresRemoved = squares.splice(i, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }

    function gameOver() {
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            scoreDisplay.innerHTML = "end"
            clearInterval(timerId)
        }
    }
})
