const decoder = new TextDecoder("utf-8");
const data = decoder.decode(Deno.readFileSync("data.txt")).trim().split("\n");

const findXmas = (grid: string[]): number => {
    const rows = grid.length;
    const cols = grid[0].length;
    const xmas = ["X", "M", "A", "S"];
    const directions = [
        [0, 1], // horizontal
        [1, 0], // vertical
        [1, 1], // diagonal down-right
        [-1, 1], // diagonal up-right
        [0, -1], // horizontal backward
        [-1, 0], // vertical backward
        [-1, -1], // diagonal up-left
        [1, -1], // diagonal down-left
    ];

    let xmasCount = 0;

    const isValidStaright = (row: number, column: number): boolean => {
        return row >= 0 && row < rows && column >= 0 && column < cols;
    };

    const checkDirection = (
        row: number,
        column: number,
        directionOfRow: number,
        directionOfColumn: number,
    ): boolean => {
        for (let i = 0; i < xmas.length; i++) {
            const nr = row + i * directionOfRow;
            const nc = column + i * directionOfColumn;
            if (!isValidStaright(nr, nc) || grid[nr][nc] !== xmas[i]) {
                return false;
            }
        }
        return true;
    };

    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < cols; column++) {
            for (const [directionOfRow, directionOfColumn] of directions) {
                if (checkDirection(row, column, directionOfRow, directionOfColumn)) {
                    xmasCount++;
                }
            }
        }
    }

    return xmasCount;
};

console.log(findXmas(data));
