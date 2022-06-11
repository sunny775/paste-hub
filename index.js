const express = require("express");
const path = require("path");

const app = express();

const { PORT = 3001 } = process.env;

app.use(express.json());

app.use(express.static("dist/app"));

app.use("/api/v1", (req, res) => res.status(200).send("accessed api"));

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "app/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
