import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

// Load Environment Variables from .env file
import dotenv from "dotenv/config";

// My Hokies
import { dbConnection } from "./src/utils/utils.js";
import { notFoundErrorHandler, errorHandler } from "./src/middlewares/errorHandler.js";
import userRouter from "./src/routes/userRoutes.js";

// connection to mongodb
dbConnection();

// Initialize Express App
const app = express();

// Middleware Setup
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Api Rouetes
app.use("/api/user", userRouter);

// Error Handler Middlewares
app.use(notFoundErrorHandler);
app.use(errorHandler);


// Starting the Server    
const PORT = process.env.PORT || 4000 ;


// App statar
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
