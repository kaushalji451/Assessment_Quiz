const express = require("express");
const User = require("../models/user");
const uploadfile = require("../middleware/multer.middleware");
const uploadFileToGoogleDrive = require("../utils/fileUpload");

const registrationRoute = express.Router();

registrationRoute.post("/info", uploadfile.single('file'), async (req, res) => {
    console.log("Registration route hit");

    
    if (!req.body) {
        return res.status(400).json({ message: "No data provided" });
    }

    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    // Log form data and file
    console.log("Form data:", req.body);
    console.log("Uploaded file:", req.file);

    const { name, email, phoneno, gender, address, dob, degree, department } = req.body;

    // Validate if file was uploaded
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;

    try {
        // Upload the file to Google Drive
        const Url = await uploadFileToGoogleDrive(filePath);

        // Save user to DB
        const user = new User({
            name,
            address,
            email,
            phoneno,
            gender,
            dateOfBirth: dob,
            degree,
            position: department,
            cvUrl: Url,
        });

        const userSaved = await user.save();
        console.log("User saved:", userSaved);

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Error in registration route", error: error.message });
    }
});

registrationRoute.post("/cv", uploadfile.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const fileUploadUrl = await uploadFileToGoogleDrive(req.file.path);
        console.log("File uploaded to Google Drive successfully:", fileUploadUrl);

        res.status(200).json({ message: "CV uploaded successfully", url: fileUploadUrl });
    } catch (error) {
        console.error("CV upload error:", error);
        res.status(500).json({ message: "Error uploading CV", error: error.message });
    }
});

module.exports = registrationRoute;
