import cluster from "node:cluster";
import os from "node:os";
import express from "express";

const cpuCount = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`Primary process: ${process.pid}`);
    console.log(`CPU cores: ${cpuCount}`);

    for (let i = 0; i < cpuCount; i++) {
        cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
        console.log(
            `Worker ${worker.process.pid} exited. Code: ${code}, Signal: ${signal}`
        );
    });
} else {
    const app = express();

    app.get("/", (req, res) => {
        res.json({
            message: "Request handled",
            processId: process.pid
        });
    });

    app.listen(5000, () => {
        console.log(`Worker ${process.pid} started`);
    });
}
