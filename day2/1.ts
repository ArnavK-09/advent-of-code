/**
 * Report safe if:
 *   Any two adjacent levels differ by at least one and at most three.
 *   The levels are either all increasing or all decreasing.
 */

const decoder = new TextDecoder("utf-8");
const data = decoder.decode(Deno.readFileSync("data.txt")).trim().split("\n");

const safeReports: string[] = [];

const checkIfReportisSafe = (report: string): boolean => {
    let isReportSafe = true;
    const numbers = report.split(" ").map((x) => parseInt(x));
    const sequence: Array<"desc" | "asc"> = [];

    // check for difference
    numbers.forEach((x, i) => {
        if (!numbers[i + 1]) return;
        const diff = Math.abs(x - numbers[i + 1]);
        if (diff > 3 || Number.isNaN(diff) || diff == 0) {
            return isReportSafe = false;
        }
    });

    numbers.forEach((x, i) => {
        if (!numbers[1 + i]) return;
        if (x > numbers[1 + i]) {
            sequence.push("desc");
        } else {
            sequence.push("asc");
        }
    });
    if (!sequence.every((x) => x == sequence[0])) {
        isReportSafe = false;
    }

    return isReportSafe;
};

data.forEach((x) => {
    const res = checkIfReportisSafe(x);
    if (res) {
        safeReports.push(x);
    }
});

console.log(safeReports.length);
