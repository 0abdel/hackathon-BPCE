require("dotenv").config();
const express = require("express");
const cors = require("cors");

const changementsRoutes = require("./routes/changementsRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const directionRoutes = require("./routes/directionRoutes");

const app = express();
const PORT = process.env.PORT || 3010;

app.use(express.json());
app.use(cors());

app.use("/api/changements", changementsRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/direction", directionRoutes);

app.get("/", (req, res) => {
    res.send("🚀 API Backend Node.js is running!");
});

app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});