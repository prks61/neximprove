const express = require("express");
const router = express.Router();
const filingsController = require("../controllers/filingsController");

// CRUD routes
router.post("/", filingsController.createFiling);
router.get("/", filingsController.getAllFilings);
router.get("/:id", filingsController.getFiling);
router.put("/:id", filingsController.updateFiling);
router.delete("/:id", filingsController.deleteFiling);

module.exports = router;
