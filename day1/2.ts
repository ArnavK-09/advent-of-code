let leftList: number[] = [];
let rightList: number[] = [];
const decoder = new TextDecoder("utf-8");
decoder.decode(Deno.readFileSync("data.txt")).trim().split("\n").forEach(
    (x) => {
        leftList.push(parseInt(x.split("   ")[0]));
        rightList.push(parseInt(x.split("   ")[1]));
    },
);

const similiars: Record<number, number> = {};
let similiarsSum: number = 0;

leftList.forEach((x) => {
    const onRight = rightList.filter((y) => y == x);
    if (!onRight) {
        similiars[x] = 0;
    } else if (similiars[x]) {
        similiars[x] = similiars[x] + (x * onRight.length);
    } else {
        similiars[x] = x * onRight.length;
    }
});

Object.keys(similiars).forEach((x: string) => {
    similiarsSum += similiars[parseInt(x)];
});

console.log(similiarsSum);
