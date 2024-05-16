import {shapes, colors, nextShapes} from './shapes.js'

document.addEventListener('DOMContentLoaded', () => {
    // Game elements
    const gameField = document.querySelector('.game-field');                    // selecting working area of cells
    let squares = Array.from(document.querySelectorAll('.game-field div'));     // selecting all cells
    const scoreDisplay = document.querySelector('#score');
    const levelDisplay = document.querySelector("#level");
    const buttonStart = document.querySelector('#start-btn');
    const displayField = document.querySelectorAll('.display-field div');       // selecting area for the next block   
    
    // Sounds
    const gameOverSound = new Audio("./sounds/game-over.mp3");
    const levelUpSound = new Audio("./sounds/level-up.mp3");
    const rowClearSound = new Audio("./sounds/row-clear.mp3");

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
    let random = Math.floor(Math.random()*shapes.length);
    let randomColor = colors[Math.floor(Math.random()*colors.length)];
    let current = shapes[random][currentRotation];

    // draw the block
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('block')
            squares[currentPosition + index].classList.add(randomColor)
        })
    }

    // undraw the block
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('block')
            squares[currentPosition + index].classList.remove(randomColor)

        })
    }

    // moving block down, left, right and rotation
    function moveDown() {
        if(timerId){
            undraw()
            currentPosition += width
            draw()
            freeze()
        }
    }
    function moveLeft(){
        if(timerId){
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
    }
    function moveRight(){
        if(timerId){
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
    }
    function rotate() {
        if(timerId){
            undraw()
            const isEdge = current.some(index => 
                (currentPosition + index + 1) % width === 0 || (currentPosition + index) % width === 0
            )
            if (!isEdge){
                currentRotation++
                if(currentRotation === current.length)
                    currentRotation = 0
                current = shapes[random][currentRotation]
            }
            draw()
        }
        
    }

    // actions when the block reach the bottom
    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
            current.forEach(index => {
                squares[currentPosition + index].classList.add("taken")
            })
            random = nextRandom
            nextRandom = Math.floor(Math.random() * shapes.length)
            randomColor = nextColor
            nextColor = colors[Math.floor(Math.random()*colors.length)]

            current = shapes[random][currentRotation]
            currentPosition = 4

            draw()
            displayShape()
            addScore()
            gameOver()
        }
    }

    // displaying the next block
    function displayShape() {
        displayField.forEach(square => {
            square.classList.remove('block')
            square.classList.remove(randomColor)
        })
        nextShapes[nextRandom].forEach(index => {
            displayField[index].classList.add('block')
            displayField[index].classList.add(nextColor)
        })
    }

    // adding points to score
    function addScore() {
        for(let i = 0; i < 199; i+=width) {
            const row = [i,i+1,i+2,i+3,i+4,i+5,i+6,i+7,i+8,i+9]

            if(row.every(index => squares[index].classList.contains('taken'))) {
                score += 10
                rowClearSound.play()
                scoreDisplay.innerHTML = score

                row.forEach(index => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('block')
                    squares[index].removeAttribute("class")
                })
                
                clearInterval(timerId)
                const squaresRemoved = squares.splice(i, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => gameField.appendChild(cell))
                timerId = setInterval(moveDown, timer)
            }
        }
    }

    // losing the game
    function gameOver() {
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            clearInterval(timerId)
            scoreDisplay.innerHTML = "end"
            gameOverSound.play()
            alert("Game is over😓 Try again!")
            window.location.href = "/"
        }
    }

    // speeding up when reaches the time
    function levelUp(){
        level++
        timer /= 1.25
        levelUpSound.play()
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

    buttonStart.addEventListener('click', () => {
        if(timerId) {
            clearInterval(timerId)
            clearInterval(levelTimer)
            timerId = null
        }
        else {
            draw()
            timerId = setInterval(moveDown, timer)
            levelTimer = setInterval(levelUp, 10000)
            nextRandom = Math.floor(Math.random() * shapes.length)
            nextColor = colors[Math.floor(Math.random()*colors.length)]
            displayShape()
        }
    })

})
