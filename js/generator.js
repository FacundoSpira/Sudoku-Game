//Auxiliar functions
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

function copyBoard(board1, board2){
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            board2[i][j] = board1[i][j]
        }
    }
}

function compareBoards(board1, board2){
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            if (board1[i][j] != board2[i][j]){
                return false
            }
        }
    }
    return true
}

function deleteCells(board, amount){
    for (i = 0; i < amount; i++){
        let x = getRndInteger(0,9)
        let y = getRndInteger(0,9)
    
        while (board[x][y] == 0){
            x = getRndInteger(0,9)
            y = getRndInteger(0,9)
        }
    
        board[x][y] = 0
    }
}

function generateSudoku(){
    let board = Array(9).fill(0).map(()=>Array(9).fill(0))
    
    //Put some numbers in the grid and then fill it with the solver to get a valid solution
    for (let i = 0; i < 9; i++){
        board[i][Math.floor(Math.random() * 9)] = i + 1
    }

    solve(board, false) //resuelvo con num del 1 al 9
    
    let copy = Array(9).fill(0).map(()=>Array(9).fill(0))
    copyBoard(board, copy)
    
    //Take out some numbers
    let amount = getRndInteger(30,56)
    deleteCells(board, amount)
    
    let sudokuFinal = Array(9).fill(0).map(()=>Array(9).fill(0))
    copyBoard(board, sudokuFinal) //we copy the board so we can then return the sudoku
    solve(board, true)
    
    //We have to make sure that there is one and only one solution to the board.
    //Otherwise we repeat the process until we get one.
    while (!compareBoards(board, copy)){
        copyBoard(copy, board)
        deleteCells(board, amount)
        copyBoard(board, sudokuFinal)
        solve(board, true)
    }

    return sudokuFinal
}