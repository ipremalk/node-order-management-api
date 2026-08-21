import express from "express";
import { Worker } from "worker_threads";

const app = express();

app.get("/normal", (req, res) => {
    res.json({
        message: "Normal API response"
    });
});

app.get("/worker", (req, res) => {
    const worker =new Worker("./practice/cpu-worker.ts");
    worker.on("message", (total) => {
        res.json({ total });
    });
    worker.on("error", () => {
        res.status(500).json({ message: "Internal server error" })
    });
});

app.listen(4000, () => {
    console.log("Practice server running on port 4000");
});
