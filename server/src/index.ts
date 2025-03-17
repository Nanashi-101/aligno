import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import projectRoutes from "./routes/projectRoutes"
import taskRoutes from "./routes/taskRoutes"

// ROUTE IMPORTS

// CONFIGURE
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use(morgan("common"));


// ROUTES
app.get("/", (req, res) => {
    res.send("Welcome to Project Manager API");
});

//  PROJECT ROUTES
app.use('/projects', projectRoutes)

//  TASK ROUTES
app.use('/tasks', taskRoutes)

// SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});