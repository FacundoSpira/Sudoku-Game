//We generate a random sudoku to start the game
let sudoku = generateSudoku()
let grid = Array(9).fill().map(()=>Array(9).fill())

let size = 70
let lives = 5
let gameOver = false
let win = false

function setup(){
	createCanvas(631,700)
	background(255)

	for (let i = 0; i < 9; i++){
		for (let j = 0; j < 9; j++){
			grid[i][j] = new Cell(i, j, sudoku[i][j]) 
		}
	}
	solve(sudoku, false) //we will use it to compare with the user input

}

function draw(){
	
	if (!gameOver && !win){	
		background(255)

		// Show cells
		for (let i = 0; i < 9; i++){
			for (let j = 0; j < 9; j++){
				grid[i][j].show()
			}
		}

		fill(0)
		
		//Show lives left
		text("Lives: " + "❤".repeat(lives), 10, height-15)

		//Check if gameOver
		if (lives == 0){
			gameOver = true
			background(255)
			text("Game Over!", width/2 - 100, height/2)
			textSize(30)
			text("Recarga para reiniciar", width/2 - 120, height/2 + 60)
		}

		//Cheque if win
		win = checkWin()
		if (win){
			background(255)
			text("Ganaste!", width/2 - 100, height/2)
			textSize(30)
			text("Recarga para reiniciar", width/2 - 120, height/2 + 60)
		}
	}
}

function findSelected(){
	for (let i = 0; i < 9; i++){
		for (let j = 0; j < 9; j++){
			if (grid[i][j].select){
				return [true, i, j]
			} 
		}
	}
	return [false, null, null]
}

function checkWin(){
	for (let i = 0; i < 9; i++){
		for (let j = 0; j < 9; j++){
			if (grid[i][j].num == 0){
				return false
			} 
		}
	}
	return true
}

function mousePressed(){
	for (let i = 0; i < 9; i++){
		for (let j = 0; j < 9; j++){
			if (grid[i][j].contains(mouseX, mouseY) && !grid[i][j].blocked){
				grid[i][j].select = true
			}else{
				grid[i][j].select = false
			}
		}
	}
}

function keyPressed(){
	//Selected will return an array with [True/False, i, j]
	//If it's false i = j = null
	let selected = findSelected()

	if (selected[0]){
		//Posible key inputs
		let numeros = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
		let i = 0
		while (i < numeros.length && key != numeros[i]){
			i++
		}
		if (i < numeros.length){
			grid[selected[1]][selected[2]].pos = int(key)
		}

		//Delete selected
		if (keyCode === BACKSPACE){
			grid[selected[1]][selected[2]].pos = 0
		}

		//Confirm
		if (keyCode === ENTER){
			if (grid[selected[1]][selected[2]].pos != 0){
				grid[selected[1]][selected[2]].confirm()
			}
		}
	}
}