const Api = require("../Model/Apikey");
const crypto = require("crypto");

module.exports.generateapi = async (req, res) => {
  try {
    const { cloudname } = req.body;

    if (!cloudname) {
      return res.status(400).json({ error: "Cloud name is required" });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    const existingApiKey = await Api.findOne({ cloudname, user: req.user._id });

    if (existingApiKey) {
      return res.status(409).json({ error: "API key already exists for this cloud name." });
    }

    const secretKey = crypto.randomBytes(30).toString("hex");

    const newApiKey = new Api({
      cloudname,
      secret: secretKey,
      user: req.user._id,
    });

    await newApiKey.save();

    console.log("New API Key Generated:", newApiKey);

    return res.status(201).json(newApiKey);
  } catch (e) {
    console.error("Error generating API key:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getallapis = async (req, res) => {
    try {
    const allapi =  await Api.find({user : req.user._id})
      return res.status(201).json(allapi);
    } catch (e) {
      console.error("Error generating API key:", e);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  module.exports.deleteapi = async (req, res) => {
    try {
   await Api.findByIdAndDelete(req.body._id)
      return res.status(201).json(null);
    } catch (e) {
      console.error("Error generating API key:", e);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  module.exports.getimage = async (req, res) => {
    try {
   await Api.findByIdAndDelete(req.body._id)
      return res.status(201).json(null);
    } catch (e) {
      console.error("Error generating API key:", e);
      return res.status(500).json({ error: "Internal server error" });
    }
  };