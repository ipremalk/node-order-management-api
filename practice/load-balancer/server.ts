import express from "express";

const app = express();

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
    return res.json({
        message: "Request processed",
        instance: PORT,
        processId: process.pid
    });
});

app.listen(PORT, () => {
    console.log(`Node instance running on ${PORT}`);
});
