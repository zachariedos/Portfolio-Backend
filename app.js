// Dépendances
const express = require("express");
const mongoose = require("mongoose");
const experiencesRoutes = require("./routes/experiences");
const sitesRoutes = require("./routes/sites");
const auth = require("./routes/user");

// MongoDB
const mongodbUsername = process.env.MONGODB_USERNAME;
const mongodbPassword = process.env.MONGODB_PASSWORD;
const mongodbDatabase = process.env.MONGODB_DATABASE;
const mongodbName = process.env.MONGODB_NAME;

mongoose
    .connect(
        `mongodb+srv://${mongodbUsername}:${mongodbPassword}@${mongodbDatabase}/?retryWrites=true&w=majority&appName=${mongodbName}`,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

// Configuration des CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());

// Routes
app.use("/", experiencesRoutes);
app.use("/portfolio", sitesRoutes);
app.use("/auth", auth);

// Définition du port
const PORT = process.env.PORT || 3000;

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`App démarrée sur : http://localhost:${PORT}`);
});

module.exports = app;
