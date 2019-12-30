let sudoku = lista[Math.floor(Math.random() * lista.length)]
let size = 70
let lives = 5
let grid = Array(9).fill().map(()=>Array(9).fill())
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
	solve(sudoku) //usaremos para comparar

}

function draw(){
	
	if (!gameOver && !win){	
		background(255)

		// Mostrar las celdas
		for (let i = 0; i < 9; i++){
			for (let j = 0; j < 9; j++){
				grid[i][j].show()
			}
		}

		fill(0)
		//Mostrar vidas
		text("Lives: " + "❤".repeat(lives), 10, height-15)

		//Chequear si perdio
		if (lives == 0){
			gameOver = true
			background(255)
			text("Game Over!", width/2 - 100, height/2)
			textSize(30)
			text("Recarga para reiniciar", width/2 - 120, height/2 + 60)
		}

		//Chequear si gano
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
	//Selected devolvera un arreglo con [True/False, i, j]
	//Si es false i = j = null
	let selected = findSelected()

	if (selected[0]){
		//Numeros
		let numeros = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
		let i = 0
		while (i < numeros.length && key != numeros[i]){
			i++
		}
		if (i < numeros.length){
			grid[selected[1]][selected[2]].pos = int(key)
		}

		//Borrar posible
		if (keyCode === BACKSPACE){
			grid[selected[1]][selected[2]].pos = 0
		}

		//Confirmar
		if (keyCode === ENTER){
			if (grid[selected[1]][selected[2]].pos != 0){
				grid[selected[1]][selected[2]].confirm()
			}
		}
	}
}