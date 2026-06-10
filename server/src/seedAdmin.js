import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import colors from "colors";
import connectDB from "./database/db.js";
import Admin from "./admin/Admin.model.js";

dotenv.config();

await connectDB();

const passwordHash = await bcrypt.hash(
  "adminaman",
  10
);

await Admin.create({
  email: "aman",
  password: passwordHash,
});

console.log("Admin Created");

process.exit();