# Minesweeper Game

Welcome to the Minesweeper Game! This classic puzzle game challenges you to clear a grid of cells without detonating hidden mines. The objective is to reveal all the safe cells without triggering any mines. If you reveal a mine, the game is over!

This version of Minesweeper is implemented using HTML, CSS, and JavaScript. It features a timer and a grid where you can click on cells to reveal them. Mines are placed randomly on the grid, and you'll need to use logic and deduction to avoid them.

## How to Play

1. **Start the Game**: Click the "Click to Start the Game" button to begin. The game grid will appear, and a timer will start.

2. **Reveal Cells**: Click on any cell to reveal it. If the cell contains a mine, the game will end, and the mine will be displayed.

3. **Avoid Mines**: **Avoid Mines**: Your goal is to reveal all non-mine cells. Use the numbers on the revealed cells to determine how many mines are present in the surrounding 8 directions. The number on a cell indicates how many of the adjacent cells contain mines.

4. **Winning the Game**: The game is won when all non-mine cells are revealed. There is no traditional winning screen; simply uncover all safe cells to win.

## Online Version

You can try out the Minesweeper game hosted online. Click the link below to play:

[Play Minesweeper Online](https://masterhardik.github.io/bomb-sweeper)

## How to Run Locally

If you want to run the game locally on your machine, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/MasterHardik/Java-Script-Mini-Project/tree/main/bomb-sweeper
   ```

2. Navigate to the Project Directory:
    ```bash
    cd repository-name
    ```

3. Open index.html in Your Browser:

    You can double-click the index.html file or open it through your browser's "Open File" option.


*More features can be added in future*
- Adding a grid size selection feature; this simply requires manipulating the grid's `rows` and `cols`.
- Adding a difficulty level option, which can use a slider to increase the number of `mineCount`.
- Adding a save game or record-saving feature using a database.