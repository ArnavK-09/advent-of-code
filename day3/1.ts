const decoder = new TextDecoder("utf-8");
const data = decoder.decode(Deno.readFileSync("data.txt")).trim();

const pattern = /mul\((\d+),(\d+)\)/g;
const matches = data.match(pattern);
const results: number[] = [];

matches?.forEach((x) => {
    const [a, b] = x.replace("mul(", "").replace(")", "").trim().split(",").map(
        Number,
    );
    if (a > 999 || a < 0) return;
    if (b > 999 || b < 0) return;

    results.push(a * b);
});

console.log(results.reduce((acc, num) => acc + num, 0));
