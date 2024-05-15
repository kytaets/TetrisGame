import {tetrominoes, colors, nextTetrominoes} from './shapes.js'

document.addEventListener('DOMContentLoaded', () =>{
    const grid = document.querySelector('.grid');                        // selecting working area of cells
    let squares = Array.from(document.querySelectorAll('.grid div'));    // selecting all cells
    const scoreDisplay = document.querySelector('#score');
    const levelDisplay = document.querySelector("#level");
    const startBtn = document.querySelector('#start-btn');
    const displaySquare = document.querySelectorAll('.mini-grid div');   // selecting area for the next block   

    const width = 10;
    let nextRandom = 0;
    let nextColor;
    let timerId;
    let timer = 1000;
    let levelTimer;
    let score = 0;
    let level = 1;

    let currentPosition = 4;
    let currentRotation = 0;

    // choosing random shape block
    let random = Math.floor(Math.random()*tetrominoes.length);
    let randomColor = colors[Math.floor(Math.random()*colors.length)];
    let current = tetrominoes[random][currentRotation];

    // draw the block
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
            squares[currentPosition + index].classList.add(randomColor)
        })
    }

    // undraw the block
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
            squares[currentPosition + index].classList.remove(randomColor)

        })
    }

    // moving block down, left, right and rotation
    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freeze()
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
        const isEdge = current.some(index => 
            (currentPosition + index + 1) % width === 0 || (currentPosition + index) % width === 0
        )
        if (!isEdge){
            currentRotation++
            if(currentRotation === current.length){
                currentRotation = 0
            }
            current = tetrominoes[random][currentRotation]
        }
        
        draw()
    }

    // actions when the block reach the bottom
    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
            current.forEach(index => {
                squares[currentPosition + index].classList.add("taken")
            })
            random = nextRandom
            nextRandom = Math.floor(Math.random() * tetrominoes.length)

            randomColor = nextColor
            nextColor = colors[Math.floor(Math.random()*colors.length)]

            current = tetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
            addScore()
            gameOver()
        }
    }

    // displaying the next block
    function displayShape() {
        displaySquare.forEach(square => {
            square.classList.remove('tetromino')
            square.classList.remove(randomColor)
        })
        nextTetrominoes[nextRandom].forEach(index => {
            displaySquare[index].classList.add('tetromino')
            displaySquare[index].classList.add(nextColor)
        })
    }

    // adding points to score
    function addScore() {
        for(let i = 0; i < 199; i+=width) {
            const row = [i,i+1,i+2,i+3,i+4,i+5,i+6,i+7,i+8,i+9]

            if(row.every(index => squares[index].classList.contains('taken'))) {
                score += 10
                scoreDisplay.innerHTML = score
                row.forEach(index => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('tetromino')
                    squares[index].removeAttribute("class")
                })
                const squaresRemoved = squares.splice(i, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }

    // losing the game
    function gameOver() {
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            scoreDisplay.innerHTML = "end"
            clearInterval(timerId)
        }
    }

    // speeding up when reaches the time
    function levelUp(){
        level++
        timer /= 1.25
        levelDisplay.innerHTML = level
        clearInterval(timerId)
        timerId = setInterval(moveDown, timer)
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

    startBtn.addEventListener('click', () => {
        if(timerId) {
            clearInterval(timerId)
            clearInterval(levelTimer)
            timerId = null
        }
        else {
            draw()
            timerId = setInterval(moveDown, timer)
            levelTimer = setInterval(levelUp, 10000)
            nextRandom = Math.floor(Math.random() * tetrominoes.length)
            nextColor = colors[Math.floor(Math.random()*colors.length)]
            displayShape()
        }
    })

})
