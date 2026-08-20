import "dotenv/config";
import app from "./app.js";
import { connectDatabase } from "./config/database.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDatabase();
        app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

startServer();
