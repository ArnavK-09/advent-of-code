const decoder = new TextDecoder("utf-8");
const data = decoder.decode(Deno.readFileSync("data.txt")).trim();

const pattern = /do\(\)|don't\(\)|mul\((\d+),(\d+)\)/g;
const matches = data.match(pattern);
const results: number[] = [];

let isMultiplyApplicable = true;

const toggleisMultiplyApplicable = (value?: boolean) =>
    isMultiplyApplicable = value ?? !isMultiplyApplicable;

matches?.forEach((x, i) => {
    if (x.includes(`don't`)) {
        toggleisMultiplyApplicable(false);
    }
    if (x.includes(`do()`)) {
        toggleisMultiplyApplicable(true);
    }
    if (!isMultiplyApplicable) return;
    if (matches[i - 1] == `don't()`) return;
    const [a, b] = x.replace("mul(", "").replace(")", "").trim().split(",").map(
        Number,
    );
    if (a > 999 || a < 0) return;
    if (b > 999 || b < 0) return;
    if (isNaN(a * b)) return;
    results.push(a * b);
});

console.log(results.reduce((acc, num) => acc + num, 0));
