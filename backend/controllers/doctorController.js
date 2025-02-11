const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");
const Notification = require("../models/notificationModel");
const Appointment = require("../models/appointmentModel");

const getalldoctors = async (req, res) => {
  try {
    let docs;
    if (!req.locals) {
      docs = await Doctor.find({ isDoctor: true }).populate("userId");
    } else {
      docs = await Doctor.find({ isDoctor: true })
        .find({
          _id: { $ne: req.locals },
        })
        .populate("userId");
    }

    return res.send(docs);
  } catch (error) {
    res.status(500).send("Unable to get doctors");
  }
};

const getnotdoctors = async (req, res) => {
  try {
    const docs = await Doctor.find({ isDoctor: false })
      .find({
        _id: { $ne: req.locals },
      })
      .populate("userId");

    return res.send(docs);
  } catch (error) {
    res.status(500).send("Unable to get non doctors");
  }
};

const applyfordoctor = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { firstname, lastname, email, password, specialization, experience, fees } = req.body;

    // Check if the user already exists
    const emailPresent = await User.findOne({ email });
    if (emailPresent) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPass = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      firstname,
      lastname,
      email,
      password: hashedPass,
    });
    const savedUser = await user.save({ session });

    if (!savedUser) {
      await session.abortTransaction();
      session.endSession();
      return res.status(500).json({ message: "Unable to apply for doctor" });
    }

    // Create a new doctor application
    const doctor = new Doctor({
      userId: savedUser._id,
      specialization,
      experience,
      fees
    });
    const result = await doctor.save({ session });

    if (!result) {
      await session.abortTransaction();
      session.endSession();
      return res.status(500).json({ message: "Unable to apply for doctor" });
    }

    await session.commitTransaction();
    session.endSession();
    return res.status(201).json({ message: "Doctor application successful" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error during doctor application:", error);
    res.status(500).json({ message: "Unable to apply for doctor" });
  }
};

const acceptdoctor = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { isDoctor: true, status: "accepted" }
    );

    const doctor = await Doctor.findOneAndUpdate(
      { userId: req.body.id },
      { isDoctor: true }
    );

    const notification = await Notification({
      userId: req.body.id,
      content: `Congratulations, Your application has been accepted.`,
    });

    await notification.save();

    return res.status(201).send("Application accepted notification sent");
  } catch (error) {
    res.status(500).send("Error while sending notification");
  }
};

const rejectdoctor = async (req, res) => {
  try {
    const details = await User.findOneAndUpdate(
      { _id: req.body.id },
      { isDoctor: false, status: "rejected" }
    );
    const delDoc = await Doctor.findOneAndDelete({ userId: req.body.id });

    const notification = await Notification({
      userId: req.body.id,
      content: `Sorry, Your application has been rejected.`,
    });

    await notification.save();

    return res.status(201).send("Application rejection notification sent");
  } catch (error) {
    res.status(500).send("Error while rejecting application");
  }
};

const deletedoctor = async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(req.body.userId, {
      isDoctor: false,
    });
    const removeDoc = await Doctor.findOneAndDelete({
      userId: req.body.userId,
    });
    const removeAppoint = await Appointment.findOneAndDelete({
      userId: req.body.userId,
    });
    return res.send("Doctor deleted successfully");
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Unable to delete doctor");
  }
};

const getAppointments = async (req, res) => {
  try {
    const doctorId = req.user._id; // Assuming req.user contains the authenticated user's info
    const appointments = await Appointment.find({ doctor: doctorId });

    if (!appointments) {
      return res.status(404).json({ message: "No appointments found" });
    }

    return res.status(200).json({ appointments });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching appointments", error });
  }
};


module.exports = {
  getalldoctors,
  getnotdoctors,
  deletedoctor,
  applyfordoctor,
  acceptdoctor,
  rejectdoctor,
  getAppointments,
};
