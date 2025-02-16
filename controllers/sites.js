const Site = require("../models/sites");
const fs = require("fs");

exports.getAllSites = (req, res, next) => {
  Site.find()
    .sort([["indexing", "asc"]])
    .then((sites) => {
      res.status(200).json(sites);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getRandomSite = (req, res, next) => {
  Site.findOne({
    siteName: req.query.siteName,
  })
    .then((site) => {
      res.status(200).json(site);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifySiteIndex = (req, res, next) => {
  Site.findByIdAndUpdate(
    req.body._id,
    { indexing: req.body.newIndex },
    {},
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(data);
      }
    }
  );
};

exports.deleteSite = (req, res, next) => {
  Site.findOne({ _id: req.body._id })
    .then(() => {
      Site.deleteOne({ _id: req.body._id })
        .then(() => res.status(200).json({ message: "Site supprimé" }))
        .catch((error) => res.status(400).json({ error: error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.addSite = (req, res, next) => {
  const newST = new Site({
    siteName: req.body.siteName,
    description: req.body.description,
    link: req.body.link,
  });
  newST
    .save()
    .then(() => {
      res.status(201).json({ message: "Site Ajouté !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
