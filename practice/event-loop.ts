console.log("START");

setTimeout(() => {
    console.log("TIMEOUT");
}, 0);

Promise.resolve().then(() => {
    console.log("PROMISE");
});

process.nextTick(() => {
    console.log("NEXT TICK");
});

console.log("END");
