const Experience = require("../models/experiences");
const fs = require("fs");

exports.getAllExperiences = (req, res, next) => {
  Experience.find()
    .sort([["indexing", "asc"]])
    .then((experiences) => {
      res.status(200).json(experiences);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getRandomExperience = (req, res, next) => {
  Experience.findOne({
    companyName: req.query.companyName,
  })
    .then((experience) => {
      res.status(200).json(experience);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifyExperienceIndex = (req, res, next) => {
  Experience.findByIdAndUpdate(
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

exports.deleteExperience = (req, res, next) => {
  Experience.findOne({ _id: req.body._id })
    .then(() => {
      Experience.deleteOne({ _id: req.body._id })
        .then(() => res.status(200).json({ message: "Experience supprimé" }))
        .catch((error) => res.status(400).json({ error: error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.addExperience = (req, res, next) => {
  const newXP = new Experience({
    companyName: req.body.companyName,
    description: req.body.description,
    fromto: JSON.stringify(req.body.fromto),
  });
  newXP
    .save()
    .then(() => {
      res.status(201).json({ message: "Experience Ajouté !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
