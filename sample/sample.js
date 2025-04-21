const express = require('express');
const cors = require('cors');

require("dotenv").config();
const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Allow CORS requests from frontend
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse form data

app.use(( req, res, next) => {
   console.log("name")
   next();
});
const { uploadImageToStorage, deleteImageformStorage,upload, } = require('./cloudesstorege/lib/api'); 

// Upload Endpoint
app.post('/uploadFile', upload.single('image'), async (req, res) => {
    try {
        const imageFile = req.file;
        if (!imageFile) {
            return res.status(400).json({ success: false, error: "No file uploaded" });
        }

        const data = await uploadImageToStorage(imageFile, 'image');
        data.error ?  res.json({ success: false, error: data.error }) : res.json({ success: true, data });
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({ success: false, error: 'Failed to process image' });
    }
});

// Delete Endpoint
app.post('/deleteImage', async (req, res) => {
    console.log("Delete request received:", req.body); // Debugging

    if (!req.body.url) {
        console.log("Error: URL missing in request");
        return res.status(400).json({ success: false, error: 'URL is required' });
    }
    console.log(req.body.url)

    try {
        const data = await deleteImageformStorage(req.body.url);
        console.log("Image deletion response:", data);
        data.error ?  res.json({ success: false, error: data.error }) : res.json({ success: true, data });
    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({ success: false, error: 'Failed to delete image' });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
