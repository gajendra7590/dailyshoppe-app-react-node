import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import User from "./src/models/User.js";
import Role from "./src/models/Role.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const roles = await Role.create([
    { name: "admin", isActive: true },
    { name: "customer", isActive: true }
]);

console.log(test)

console.log("Seed Completed");

process.exit();