class Cell {
	
	constructor(i, j, num) {
		this.i = i
		this.j = j
		this.num = num
		this.pos = 0
		this.blocked = (num != 0)
		this.select = false
	}
	
	show() {
		let gridX = (this.i - this.i % 3) / 3
		let gridY = (this.j - this.j % 3) / 3
		if ((gridX % 2 == 0 && gridY % 2 == 0) || (gridX == 1 && gridY == 1)) {
			fill(255)
		}
		else {
			fill(222)
		}
		if (this.select) {
			fill(161, 238, 255)
		}
		
		rect(this.j * size, this.i * size, size, size)
		if (this.num != 0) {
			fill(0)
			textSize(45)
			text(this.num, this.j * size + size / 3, this.i * size + size / 1.4)
		}
		if (this.pos != 0) {
			fill(0, 0, 255)
			textSize(45)
			text(this.pos, this.j * size + size / 3, this.i * size + size / 1.4)
		}
	}
	
	contains(x, y) {
		return ((x > this.j * size) && (x < this.j * size + size) && (y > this.i * size) && (y < this.i * size + size))
	}
	
	confirm() {
		if (this.pos == sudoku[this.i][this.j]) {
			this.num = this.pos
			this.pos = 0
			this.blocked = true
		}
		else {
			lives--
			this.pos = 0
		}
	}
}