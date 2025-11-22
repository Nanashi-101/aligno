import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";
import searchRoutes from "./routes/searchRoutes";
import userRoutes from "./routes/userRoutes";
import teamRoutes from "./routes/teamRoutes";

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
    res.send("Welcome to Aligno Project Manager");
});

//  PROJECT ROUTES
app.use('/projects', projectRoutes)

//  TASK ROUTES
app.use('/tasks', taskRoutes)

//  SEARCH ROUTES
app.use('/search', searchRoutes)

//  USER ROUTES
app.use('/users', userRoutes)

// TEAM ROUTES
app.use('/teams', teamRoutes)

// SERVER
const port = Number(process.env.PORT) || 5000;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
});