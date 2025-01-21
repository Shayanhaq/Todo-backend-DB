import mongoose from "mongoose";
import { DB_NAME, MONGO_URI } from "../config/index.js";
const MongoDB_URI = process.port.env
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(MongoDB_URI, {
      dbName: "Todo-App",
    });

    console.log(`\n🌿 MongoDB connected ! 🍃\n`);

    mongoose.connection.on(
      "error",
      console.error.bind(console, "Connection error:"),
    );

   
  } catch (error) {
    console.error("MONGODB connection FAILED ", error);
  }
};

 connectDB ();