const decoder = new TextDecoder("utf-8");
const data = decoder.decode(Deno.readFileSync("data.txt")).trim().split("\n");

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

const isThisReportOneBugSafe = (report: string) => {
    if (checkIfReportisSafe(report)) return true;
    let i = 0;
    while (i < report.split(" ").length) {
        const subSet = report.split(" ").toSpliced(i, 1);
        if (checkIfReportisSafe(subSet.join(" "))) return true;
        i++;
    }
    return false;
};

const safeReportsWOneBug = [];
data.forEach((x) => {
    const res = isThisReportOneBugSafe(x);
    if (res) {
        safeReportsWOneBug.push(x);
    }
});

console.log(safeReportsWOneBug.length);
