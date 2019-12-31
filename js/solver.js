function findEmpty(grid){
	for (let i = 0; i < 9; i++){
		for (let j = 0; j < 9; j++){
			if (grid[i][j] == 0){
				return [i,j]
			}
		}
	}
	return true // True indicates that there are not more empty cells
}

function isValid(grid, pos, num){
	//Check row
	for (let i = 0; i < 9; i++){
		if (grid[pos[0]][i] == num && i != pos[1]){
			return false
		}
	}

	//Check column
	for (let j = 0; j < 9; j++){
		if (grid[j][pos[1]] == num && j != pos[0]){
			return false
		}
	}

	//Check subgrid
	let posX = pos[0] - pos[0] % 3
	let posY = pos[1] - pos[1] % 3

	for (let i = posX; i < posX + 3; i++){
		for (let j = posY; j < posY + 3; j++){
			if (grid[i][j] == num && (pos[0] != i && pos[1] != j)){
				return false
			}
		}		
	}

	return true //If it passes all checks, then it is valid
}

function solve(grid, inverse){

	let pos = findEmpty(grid)
	if (pos == true){
		return true
	}

	if (inverse){
		for (let num = 9; num >= 1; num--){
			
			if (isValid(grid, pos, num)){
				grid[pos[0]][pos[1]] = num
			
				if (solve(grid, true)){
					return true
				}
				grid[pos[0]][pos[1]] = 0
			}
		}
	}else{
		for (let num = 1; num <= 9; num++){
			
			if (isValid(grid, pos, num)){
				grid[pos[0]][pos[1]] = num
			
				if (solve(grid, false)){
					return true
				}
				grid[pos[0]][pos[1]] = 0
			}
		}
	}
	return false //Triggers backtracking
}