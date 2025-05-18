const express = require("express");
const User = require("../models/user");
const uploadfile = require("../middleware/multer.middleware");
const uploadFileToGoogleDrive = require("../utils/fileUpload");
const fs = require("fs");
const path = require("path");
const sendEmailforRegistration = require("../utils/sendEmailForRegistration");
const sendConfirmationEmailToHr = require("../utils/sendConfirmationEmailToHr");
const { v4: uuidv4 } = require('uuid');
const registrationRoute = express.Router();

registrationRoute.post("/info", uploadfile.single("file"), async (req, res) => {
    console.log("Registration route hit");

    console.log(req.body)

    if (!req.body) {
        return res.status(400).json({ message: "No data provided" });
    }

    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }



    // Log form data and file
    console.log("Form data:", req.body);
    console.log("Uploaded file:", req.file);

    const { name, email, phoneno, gender, address, dob, degree, department, sop } = req.body;

    // Validate if file was uploaded
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;

    try {
        // Upload the file to Google Drive
        const Url = await uploadFileToGoogleDrive(filePath);

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
            }
        });

        // Save user to DB
        const user = new User({
            registrationId:uuidv4(),
            name,
            address,
            email,
            phoneno,
            gender,
            dateOfBirth: dob,
            degree,
            position: department,
            cvUrl: Url,
            SOP: sop,
        });

        const userSaved = await user.save();
        console.log("User saved:", userSaved);
        await sendEmailforRegistration(userSaved);
        await sendConfirmationEmailToHr(userSaved)
        console.log(userSaved)
        res.status(201).json({ message: "User registered successfully", userSaved });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Error in registration route", error: error.message });
    }
});

module.exports = registrationRoute;