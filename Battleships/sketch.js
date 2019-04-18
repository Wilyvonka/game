/* BUGS:
	kan sette skip oppå hverandre
*/


let cols = 10;
let rows = 10;
let w;
let boxes = [];
let boxes2 = [];
isPlacing = true;
let base = [];
let end = [];
let placements = 0;
let currlen;
let turn = 0;
let p1Hits = 0;
let p2Hits = 0;
let txt = {
	x: 100,
	y: 100,
	text: 'Player 1 place your ships'
};

function setup() {
	createCanvas(windowWidth, windowHeight);
	textSize(32);
	textAlign(CENTER);
	if (windowWidth > windowHeight) {
		w = windowHeight / rows;
		txt.x = width - (width - cols * w) / 2;
		txt.y = height / 2;
	} else {
		w = windowWidth / cols;
		txt.y = height - (height - rows * w) / 2;
		txt.x = width / 2;
	}

	//add margins
	background(51);
	stroke(255);
	noFill();

	for (let i = 0; i < cols; i++) {
		boxes[i] = [];
		boxes2[i] = [];
		for (let j = 0; j < rows; j++) {
			boxes[i][j] = new Box(i * w, j * w, w);
			boxes2[i][j] = new Box(i * w, j * w, w);
		}
	}
}

function draw() {
	background(51)
	for (let i = 0; i < boxes.length; i++) {
		for (let j = 0; j < boxes[i].length; j++) {
			if (placements < 10) {
				boxes[i][j].render();
			} else if (placements < 20) {
				boxes2[i][j].render();
			} else if (turn % 2 != 0) {
				boxes[i][j].render();
			} else {
				boxes2[i][j].render();
			}
		}
	}
	fill(255);
	text(txt.text, txt.x, txt.y);
	if (p1Hits == 17) {
		gameover('player 1 ');
	} else if (p2Hits == 17) {
		gameover('player 2 ');
	}

}


class Box {
	constructor(x, y, w) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.highlight = false;
		this.isShip = false;
		this.hit = false;
		this.base = false;
		this.end = false;
	}
	render() {

		if (this.intersects(mouseX, mouseY)) {
			this.highlight = true;
		} else {
			this.highlight = false;
		}
		if (this.highlight) {
			fill(0, 0, 255);
		} else if (this.hit && this.isShip) {
			fill(255, 0, 0);
		} else if (this.hit) {
			fill(200);
		} else if (this.isShip && placements < 20) {
			fill(100);
		} else {
			noFill();
		}
		rect(this.x, this.y, this.w, this.w);
	}

	intersects(otherx, othery) {
		if (otherx > this.x && otherx < this.x + this.w && othery > this.y && othery < this.y + this.w) {
			return true;
		}
	}
}

function gameover(player) {
	textSize(128);
	fill(0, 255, 0);
	noLoop();
	background(51);
	text(player + 'wins', width / 2, height / 2);
}

function mousePressed() {
	for (let i = 0; i < boxes.length; i++) {
		for (let j = 0; j < boxes[i].length; j++) {

			if (boxes[i][j].intersects(mouseX, mouseY)) {
				if (!isPlacing) {
					if (turn % 2 == 0) {
						boxes2[i][j].hit = true;
						if (!boxes2[i][j].isShip) {
							turn++;
							txt.text = "Player 2's turn";
						} else {
							p1Hits++;
						}
					} else {
						boxes[i][j].hit = true;
						if (!boxes[i][j].isShip) {
							turn++;
							txt.text = "Player 1's turn";
						} else {
							p2Hits++;
						}
					}
				} else {
					if (placements % 2 == 0) {
						base = [i, j];
						if (placements < 10) {
							boxes[i][j].isShip = true;
						} else {
							boxes2[i][j].isShip = true;
						}
						placements++
						if (placements == 1 || placements == 11) {
							currlen = 2;
						} else if (placements == 3 || placements == 5 || placements == 13 || placements == 15) {
							currlen = 3;
						} else if (placements == 7 || placements == 17) {
							currlen = 4;
						} else if (placements == 9 || placements == 19) {
							currlen = 5;
						}
						txt.text = 'length of ship is ' + currlen + ' tiles';
					} else {
						end = [i, j];
						if (base[1] == end[1] && base[0] - end[0] == currlen - 1) {
							for (let k = 0; k < abs(end[0] - base[0]); k++) {
								if (placements < 10) {
									boxes[base[0] - k - 1][base[1]].isShip = true;
								} else {
									boxes2[base[0] - k - 1][base[1]].isShip = true;

								}
							}
							placements++;
						} else if (base[1] == end[1] && base[0] - end[0] == -currlen + 1) {
							for (let k = 0; k < abs(end[0] - base[0]); k++) {
								if (placements < 10) {
									boxes[base[0] + k + 1][base[1]].isShip = true;
								} else {
									boxes2[base[0] + k + 1][base[1]].isShip = true;
								}
							}
							placements++;
						} else if (base[0] == end[0] && base[1] - end[1] == currlen - 1) {
							for (let k = 0; k < abs(end[1] - base[1]); k++) {
								if (placements < 10) {
									boxes[base[0]][base[1] - k - 1].isShip = true;
								} else {
									boxes2[base[0]][base[1] - k - 1].isShip = true;
								}
							}
							placements++;
						} else if (base[0] == end[0] && base[1] - end[1] == -currlen + 1) {
							for (let k = 0; k < abs(end[1] - base[1]); k++) {
								if (placements < 10) {
									boxes[base[0]][base[1] + k + 1].isShip = true;
								} else {
									boxes2[base[0]][base[1] + k + 1].isShip = true;

								}
							}
							placements++;
						}
					}
					if (placements == 10) {
						txt.text = 'Player 2 place your ships';
					}
					if (placements == 20) {
						txt.text = 'Player 1 start';
						isPlacing = false;
					}
				}
			}
		}
	}
}
