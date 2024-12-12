import { Request, Response } from "express";
import { apiRouter } from "./index.routes";
import path from "path";
import dotenv from 'dotenv';

const express = require("express");

dotenv.config();

const app = express();
const { OPENAI_API_KEY, PORT, NODE_ENV } = process.env;

if (!OPENAI_API_KEY) {
  throw Error("Invalid or missing env variables")
}

const getClientBuildPath = () => {
  return path.join(__dirname, NODE_ENV === 'local' ? "../../client/build" : "../../../src/client/build");
}

const clientBuildPath = getClientBuildPath();

app.use(express.static(clientBuildPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", apiRouter);

app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

app.listen(PORT || 3001, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});