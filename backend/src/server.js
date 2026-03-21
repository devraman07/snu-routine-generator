import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import app from "./app.js";
import { connectDB } from "./config/db.js";

// Load .env, then override with .env.local if present
dotenv.config();
const envLocalPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath, override: true });
}

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

(async () => {
  try {
    await connectDB(MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();
