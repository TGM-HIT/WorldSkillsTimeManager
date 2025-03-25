<template>
    <div style="text-align: center;">
      <h2>Minesweeper</h2>
      <div class="grid">
        <div 
          v-for="(cell, index) in grid" 
          :key="index" 
          class="cell" 
          :class="{ revealed: cell.revealed, mine: cell.mine && cell.revealed, flagged: cell.flagged }"
          @click="revealCell(index)"
          @contextmenu.prevent="toggleFlag(index)"
        >
          {{ cell.revealed && !cell.mine ? cell.neighborMines || '' : cell.flagged ? '🚩' : '' }}
        </div>
      </div>
      <button @click="resetGame">Restart</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        rows: 8,
        cols: 8,
        mines: 10,
        grid: [],
      };
    },
    created() {
      this.resetGame();
    },
    methods: {
      resetGame() {
        this.grid = Array.from({ length: this.rows * this.cols }, () => ({
          mine: false,
          revealed: false,
          flagged: false,
          neighborMines: 0,
        }));
        this.placeMines();
        this.calculateNumbers();
      },
      placeMines() {
        let placed = 0;
        while (placed < this.mines) {
          let index = Math.floor(Math.random() * this.grid.length);
          if (!this.grid[index].mine) {
            this.grid[index].mine = true;
            placed++;
          }
        }
      },
      calculateNumbers() {
        const directions = [-1, 1, -this.cols, this.cols, -this.cols - 1, -this.cols + 1, this.cols - 1, this.cols + 1];
        this.grid.forEach((cell, index) => {
          if (!cell.mine) {
            let count = 0;
            directions.forEach((dir) => {
              const neighborIndex = index + dir;
              if (this.isValidNeighbor(index, neighborIndex) && this.grid[neighborIndex].mine) {
                count++;
              }
            });
            cell.neighborMines = count;
          }
        });
      },
      isValidNeighbor(index, neighborIndex) {
        if (neighborIndex < 0 || neighborIndex >= this.grid.length) return false;
        const sameRow = Math.floor(index / this.cols) === Math.floor(neighborIndex / this.cols);
        if (Math.abs(index - neighborIndex) === 1) return sameRow;
        return true;
      },
      revealCell(index) {
        if (this.grid[index].revealed || this.grid[index].flagged) return;
        this.grid[index].revealed = true;
        if (this.grid[index].mine) {
          alert("Game Over!");
          this.resetGame();
        } else if (this.grid[index].neighborMines === 0) {
          this.revealAdjacentCells(index);
        }
      },
      revealAdjacentCells(index) {
        const directions = [-1, 1, -this.cols, this.cols, -this.cols - 1, -this.cols + 1, this.cols - 1, this.cols + 1];
        directions.forEach((dir) => {
          const neighborIndex = index + dir;
          if (this.isValidNeighbor(index, neighborIndex) && !this.grid[neighborIndex].revealed) {
            this.revealCell(neighborIndex);
          }
        });
      },
      toggleFlag(index) {
        if (this.grid[index].revealed) return;
        this.grid[index].flagged = !this.grid[index].flagged;
      },
    },
  };
  </script>
  
  <style scoped>
  .grid {
    display: grid;
    grid-template-columns: repeat(8, 30px);
    gap: 2px;
    margin: 20px auto;
  }
  .cell {
    width: 30px;
    height: 30px;
    background-color: lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    border: 1px solid gray;
    cursor: pointer;
  }
  .cell.revealed {
    background-color: white;
  }
  .cell.mine {
    background-color: red;
  }
  .cell.flagged {
    background-color: yellow;
  }
  button {
    margin-top: 10px;
    padding: 5px;
    cursor: pointer;
  }
  </style>