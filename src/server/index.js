const express = require("express");
const path = require("path");
const compression = require("compression");
const helmet = require("helmet");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

const { PORT = 3001 } = process.env;

app.use(express.json());
app.use(compression());
app.use(helmet());

app.use(express.static("dist/client"));

app.use("/api/v1", (req, res) => res.status(200).send("accessed api"));

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "client/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
