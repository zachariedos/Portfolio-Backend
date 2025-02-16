const express = require("express");
const router = express.Router();

const sitesCtrl = require("../controllers/sites");

router.get("/", sitesCtrl.getAllSites);
router.get("/randomsite", sitesCtrl.getRandomSite);
router.put("/modifySiteIndex", sitesCtrl.modifySiteIndex);
router.post("/deleteSite", sitesCtrl.deleteSite);
router.post("/addSite", sitesCtrl.addSite);

module.exports = router;
