let leftList: number[] = [];
let rightList: number[] = [];
let SUM = 0
let toBesummed: number[] = [];
const decoder = new TextDecoder("utf-8");
decoder.decode(Deno.readFileSync("data.txt")).trim().split("\n").forEach(
    (x) => {
        leftList.push(parseInt(x.split("   ")[0]));
        rightList.push(parseInt(x.split("   ")[1]));
    },
);

leftList = leftList.sort((x, y) => x - y);
rightList = rightList.sort((x, y) => x - y);

leftList.map((x, i) => {
    toBesummed.push(x - rightList[i]);
});
toBesummed = toBesummed.map((x) => {
    if (x == 0) {
        return 0;
    } else if (x <= 0) {
        return x * -1;
    } else {
        return x;
    }
});
toBesummed.forEach(x => {
    SUM += x
})
console.log(SUM);
