const express = require("express");
const mysql = require("mysql");
const myConnection = require("express-myconnection");
const playersRoutes = require("./routes/playersRoutes");


const optionBd = {
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
  database: "ftf_db",
};

const app = express();

//Extration des données du formulaire
app.use(express.urlencoded({ extended: false }));

//Définition du middleware pur connexion avec la bd
app.use(myConnection(mysql, optionBd, "pool"));

//Définition du moteur d'affichage
app.set("view engine", "ejs");
app.set("views", "IHM");

//Définition des routes pour players
app.use(playersRoutes);

app.get("/apropos", (req, res) => {
  res.status(200).render("apropos");
});

app.use((req, res) => {
  res.status(404).render("pageIntrouvable");
});

app.listen(3001);
console.log("Attente des requêtes au port 3001");
