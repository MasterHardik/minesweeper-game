document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-btn');
    const intro = document.getElementById('intro');
    const container = document.querySelector('.container');
    const timerElement = document.querySelector('.timer');
    const imgs = ['./media/TNT.jpg', './media/bomb.jpeg']; // Array of images
    let currentIndex = 1;

    function changeBackgroundImage() {
        currentIndex = (currentIndex + 1) % imgs.length; // Cycle through the images
        container.style.backgroundImage = `url(${imgs[currentIndex]})`;
    }

    // Change image every 20 seconds (20000 milliseconds)
    setInterval(changeBackgroundImage, 20000);

    startButton.addEventListener('click', () => {
        intro.style.display = 'none'; // Hide instructions and button
        initGame(); // Initialize the game
    });

    function initGame() {
        const rows = 8;
        const cols = 8;
        const mineCount = 10; // Adjust the number of mines here
        const cells = [];
        let gameOver = false;
        let seconds = 0;
        let timer;

        const table = document.querySelector('table');

        function startTimer() {
            timer = setInterval(() => {
                seconds++;
                const minutes = Math.floor(seconds / 60);
                const secs = seconds % 60;
                timerElement.textContent = `${minutes}:${secs < 10 ? '0' : ''}${secs} min`;
            }, 1000);
        }

        function stopTimer() {
            clearInterval(timer);
        }

        function showWinningMessage() {
            intro.style.display = 'block'; // Show the intro section
            intro.textContent = `Congratulations! You won the game in ${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? '0' : ''}${seconds % 60} min.`;
            startButton.textContent = 'Play Again';
            startButton.removeEventListener('click', startNewGame); // Remove existing listener
            startButton.addEventListener('click', startNewGame); // Add new listener

            function startNewGame() {
                intro.style.display = 'none';
                initGame(); // Restart the game
            }
        }

        // Create and initialize the game board
        function createBoard() {
            table.innerHTML = '';
            cells.length = 0;
            gameOver = false;
            seconds = 0;
            startTimer();

            // Create the board
            for (let r = 0; r < rows; r++) {
                const tr = document.createElement('tr');
                cells[r] = [];
                for (let c = 0; c < cols; c++) {
                    const td = document.createElement('td');
                    td.classList.add('cellCR');
                    td.dataset.row = r;
                    td.dataset.col = c;
                    td.addEventListener('click', handleClick);
                    tr.appendChild(td);
                    cells[r][c] = { isMine: false, isRevealed: false, adjacentMines: 0, element: td };
                }
                table.appendChild(tr);
            }

            // Place mines
            let placedMines = 0;
            while (placedMines < mineCount) {
                const row = Math.floor(Math.random() * rows);
                const col = Math.floor(Math.random() * cols);
                if (!cells[row][col].isMine) {
                    cells[row][col].isMine = true;
                    placedMines++;
                }
            }

            // Calculate adjacent mines for each cell
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    if (!cells[r][c].isMine) {
                        cells[r][c].adjacentMines = countAdjacentMines(r, c);
                    }
                }
            }
        }

        // Count the number of adjacent mines for a cell
        function countAdjacentMines(row, col) {
            const directions = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1],         [0, 1],
                [1, -1], [1, 0], [1, 1]
            ];
            let count = 0;
            directions.forEach(([dRow, dCol]) => {
                const newRow = row + dRow;
                const newCol = col + dCol;
                if (isValidCell(newRow, newCol) && cells[newRow][newCol].isMine) {
                    count++;
                }
            });
            return count;
        }

        // Reveal all the other mines when one mine is clicked
        function revealAllOtherMines() {
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    if (cells[r][c].isMine) {
                        const cell = cells[r][c].element;
                        cell.classList.add('mine');
                        cell.textContent = '💣';
                    }
                }
            }
        }

        // Check if a cell is within the grid boundaries
        function isValidCell(row, col) {
            return row >= 0 && row < rows && col >= 0 && col < cols;
        }

        // Handle cell click
        function handleClick(event) {
            if (gameOver) return;

            const cell = event.target;
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);

            if (cells[row][col].isRevealed) return;
            cells[row][col].isRevealed = true;
            if (cells[row][col].isMine) {
                stopTimer();
                revealAllOtherMines();
                cell.classList.add('mine-blast');
                cell.textContent = '💣';
                gameOver = true;
                alert('Game Over! You hit a mine.');
                return;
            }

            cell.classList.add('revealed');
            if (cells[row][col].adjacentMines > 0) {
                cell.textContent = cells[row][col].adjacentMines;
            } else {
                cell.textContent = '';
                revealEmptyCells(row, col);
            }

            // Check for win condition (all non-mine cells revealed)
            if (checkWinCondition()) {
                stopTimer();
                gameOver = true;
                showWinningMessage();
                table.style.display = 'none'; // Hide the game board
            }
        }

        // Reveal empty cells recursively
        function revealEmptyCells(row, col) {
            const directions = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1],         [0, 1],
                [1, -1], [1, 0], [1, 1]
            ];

            directions.forEach(([dRow, dCol]) => {
                const newRow = row + dRow;
                const newCol = col + dCol;

                if (isValidCell(newRow, newCol)) {
                    const cell = cells[newRow][newCol].element;
                    if (!cells[newRow][newCol].isRevealed && !cells[newRow][newCol].isMine) {
                        cells[newRow][newCol].isRevealed = true;
                        cell.classList.add('revealed');
                        if (cells[newRow][newCol].adjacentMines === 0) {
                            cell.textContent = '';
                            revealEmptyCells(newRow, newCol);
                        } else {
                            cell.textContent = cells[newRow][newCol].adjacentMines;
                        }
                    }
                }
            });
        }

        // Check for win condition
        function checkWinCondition() {
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    if (!cells[r][c].isMine && !cells[r][c].isRevealed) {
                        return false;
                    }
                }
            }
            return true;
        }

        // Initialize the game on page load
        createBoard();
    }
});
