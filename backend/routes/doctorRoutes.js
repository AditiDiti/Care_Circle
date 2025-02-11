const express = require("express");
const doctorController = require("../controllers/doctorController");
const auth = require("../middleware/auth");
const checkDoctor = require('../middleware/checkDoctor');

const doctorRouter = express.Router();

doctorRouter.get("/getalldoctors", doctorController.getalldoctors);

doctorRouter.get("/getnotdoctors", auth, doctorController.getnotdoctors);

doctorRouter.post("/applyfordoctor", doctorController.applyfordoctor);

doctorRouter.put("/deletedoctor", auth, doctorController.deletedoctor);

doctorRouter.put("/acceptdoctor", auth, doctorController.acceptdoctor);

doctorRouter.put("/rejectdoctor", auth, doctorController.rejectdoctor);

doctorRouter.get("/appointments", auth, checkDoctor, doctorController.getAppointments);

module.exports = doctorRouter;
