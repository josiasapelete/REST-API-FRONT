const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  req.getConnection((erreur, connection) => {
    if (erreur) {
      console.log(erreur);
      res.status(500).render("erreur", { erreur });
    } else {
      connection.query("SELECT * FROM players", [], (erreur, resultat) => {
        if (erreur) {
          console.log(erreur);
          res.status(500).render("erreur", { erreur });
        } else {
          res.status(200).render("index", { resultat });
        }
      });
    }
  });
});

router.post("/players", (req, res) => {
  let id = req.body.id === "" ? null : req.body.id;
  let nom = req.body.nom;
  let wins = req.body.wins;
  let losses = req.body.losses;
  let scores = req.body.scores;

  let club = req.body.club;

  let reqSql =
    id === null
      ? "INSERT INTO players(id, Nom, wins ,losses ,scores, club) VALUES(?, ?,?,?,?, ?)"
      : "UPDATE players SET Nom = ?, wins = ?, losses = ?, scores = ?, club = ? WHERE id = ?";

  let donnees =
    id === null ? [null, nom, wins,losses,scores,club] : [nom, wins,losses,scores,club, id];

  req.getConnection((erreur, connection) => {
    if (erreur) {
      console.log(erreur);
      res.status(500).render("erreur", { erreur });
    } else {
      connection.query(reqSql, donnees, (erreur, resultat) => {
        if (erreur) {
          console.log(erreur);
          res.status(500).render("erreur", { erreur });
        } else {
          res.status(300).redirect("/");
        }
      });
    }
  });
});

router.delete("/players/:id", (req, res) => {
  let id = req.params.id;
  req.getConnection((erreur, connection) => {
    if (erreur) {
      console.log(erreur);
      res.status(500).render("erreur", { erreur });
    } else {
      connection.query(
        "DELETE FROM players WHERE id = ?",
        [id],
        (erreur, resultat) => {
          if (erreur) {
            console.log(erreur);
            res.status(500).render("erreur", { erreur });
          } else {
            res.status(200).json({ routeRacine: "/" });
            
          }
        }
      );
    }
  });
});

module.exports = router;
