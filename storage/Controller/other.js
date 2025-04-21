const Api = require("../Model/Apikey");
const User = require('../Model/User')
const imagedata = require('../Model/imagedata')

module.exports.basborddata = async (req, res) => {
  try {
    const api = await Api.find({ user: req.user._id });
    const data = await User.findById(req.user._id);
    const cloudnames = api.map(item => item.cloudname);
    console.log(cloudnames); 
    return res.status(201).json({cloudnames,data});
  } catch (e) {
    console.error("Error generating API key:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};



module.exports.getfolder = async (req, res) => {

  try {
    const api = await Api.find({ user: req.user._id });
    const cloudnames = api.map(item => ({
      cloudname: item.cloudname,
      _id: item._id
    }));

 return res.status(201).json(cloudnames);
  } catch (e) {
    console.error("Error generating API key:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getimage = async (req, res) => {
  try {
   const id = req.query.id != "0000" ?{apikey: req.query.id }: {user:req.user._id}

    const data = await imagedata.find(id);

    return res.status(201).json(data|| []);
  } catch (e) {
    console.error("Error generating API key:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.payment = async (req, res) => {
  try {
    console.log(req.user._id)
    console.log(req.body.planname)
    await User.findByIdAndUpdate(req.user._id,{plan:req.body.planname})
    return res.status(200).json({mess:"ok"});
  } catch (e) {
    console.error( e);
    return res.status(500).json({ error: "Internal server error" });
  }
};
module.exports.getplan = async (req, res) => {
  try {
   const plan =  await User.findById(req.user._id)
    return res.status(200).json({plan:plan.plan});
  } catch (e) {
    console.error( e);
    return res.status(500).json({ error: "Internal server error" });
  }
};


