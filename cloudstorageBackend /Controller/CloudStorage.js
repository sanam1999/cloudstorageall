const Api = require("../Model/Apikey");
const User = require('../Model/User');
const Imagedata = require('../Model/imagedata');
const fs = require('fs');
const { execSync } = require("child_process");

const path = require('path');
module.exports.UploadStorage = async (req, res) => {
  try {
   
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const api = await Api.findById(req.headers.key);
    const sizeInMB = req.file.size / 1024;
    let ip  = getIPAddress()
    const imageUrl = `http://${ip}:3001/uploads/${req.file.filename}`;
    let imagedata = new Imagedata({
      url: imageUrl,
      filename: req.file.filename,
      size: sizeInMB,
      user: api.user,
      apikey: req.headers.key,
      originalname:req.file.originalname
    });
    await imagedata.save();
    await User.findByIdAndUpdate(
      api.user,
      { $inc: { usedStorage: sizeInMB } },
      { new: true }
    );
    res.json({ imageUrl, size: sizeInMB, filename: req.file.filename });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id);

    const imageData = await Imagedata.findById(id);
    if (!imageData) {
      return res.status(404).json({ error: "Image not found" });
    }
    if (imageData.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "You are not authorized to delete this image" });
    }

    deleteImage(imageData.filename)
    await Imagedata.findByIdAndDelete(id);
    await User.findByIdAndUpdate(
      imageData.user._id,
      { $inc: { usedStorage: -imageData.size } },
      { new: true }
    );
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports.APIdeleteImage = async (req, res) => {
  try {
console.log(req.body.imageUrl)
    const imageData = await Imagedata.findOne({url:req.body.imageUrl});
    if (!imageData) {
      return res.status(404).json({ error: "Image not found" });
    }
    console.log(imageData)
    deleteImage(imageData.filename)
    await Imagedata.findByIdAndDelete(imageData._id);
    await User.findByIdAndUpdate(
      imageData.user._id,
      { $inc: { usedStorage: -imageData.size } },
      { new: true }
    );
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const deleteImage = (filePath) => {
  const fullPath = path.join(__dirname, `../uploads/${filePath}`);

  fs.access(fullPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("File does not exist:", fullPath);
      return;
    }

    fs.unlink(fullPath, (err) => {
      if (err) {
        console.error("Failed to delete file:", err);
      } else {
        console.log("File deleted successfully:", fullPath);
      }
    });
  });
};






function getIPAddress() {
    return execSync("ipconfig getifaddr en0").toString().trim();
}