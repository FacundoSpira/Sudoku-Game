function findEmpty(grid){
	for (let i = 0; i < 9; i++){
		for (let j = 0; j < 9; j++){
			if (grid[i][j] == 0){
				return [i,j]
			}
		}
	}
	return true // Indica que no hay mas lugares vacios
}

function isValid(grid, pos, num){
	//Chequeamos la fila
	for (let i = 0; i < 9; i++){
		if (grid[pos[0]][i] == num){
			return false
		}
	}

	//Chequeamos la columna
	for (let j = 0; j < 9; j++){
		if (grid[j][pos[1]] == num){
			return false
		}
	}

	//Chequeamos su subgrid
	let posX = pos[0] - pos[0] % 3
	let posY = pos[1] - pos[1] % 3
	
	for (let i = posX; i < posX + 3; i++){
		for (let j = posY; j < posY + 3; j++){
			if (grid[i][j] == num){
				return false
			}
		}		
	}

	return true //Si pasa todos los chequeos es valido
}

function solve(grid){

	let pos = findEmpty(grid)
	if (pos == true){
		return true
	}

	for (let num = 1; num <= 9; num++){
		
		if (isValid(grid, pos, num)){
			grid[pos[0]][pos[1]] = num
		
			if (solve(grid)){
				return true
			}
			grid[pos[0]][pos[1]] = 0
		}
	}
	return false //Permite el backtracking
}