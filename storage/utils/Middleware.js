// const Listing = require('../models/listing.js')
const User = require('../Model/User')
// const Token = require('../models/token.js')
// const ExpressError = require("./ExpressError.js")
// const { ListingSchema, reviewShema } = require('./shema.js'); 
// const Revies = require('../models/review.js');
// const { AccountVerification } = require('../ThirdParty/nodemiler.js');
// const { response, json } = require('express');

 const Api = require('../Model/Apikey')


module.exports.isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.url = req.originalUrl; // Save the URL the user was trying to access
        req.flash("error", "You must be logged in to access this page.");
        return res.redirect('/user/login'); // Redirect to login page
    }
    next();
};

module.exports.isLogin = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
};


module.exports.saveURL = (req, res, next) => {
    if (req.session.url) {
        res.locals.url = req.session.url;
    }
    next();
};
module.exports.isowner = async (req, res, next) => {
    const { _id }  = req.user;
    if (!_id.equals(res.locals.curUser._id)) {
        req.flash("error", "You are not the owner");
        return res.redirect(`/profile`)
    }
    next();
}
module.exports.listingvalidate = (req, res, next) => {
    const { error } = ListingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",")
        throw new ExpressError(400,errMsg)
    } else {
        next();
    }
};
module.exports.validatereview = (req, res, next) => {
    const { error } = reviewShema.validate(req.body);
    if (error) {
        const errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } 
    next();
};
module.exports.isOeviewOwner = async (req, res, next) => {
     const { rid ,id} = req.params;
    let revies = await Revies.findById(rid);
    if (!revies.author._id.equals(res.locals.curUser._id)) {
        req.flash("error", "You are not the author of this revies");
        return res.redirect(`/listings/${id}`)
    }
    next();
}
module.exports.isboarMember = async (req, res, next) => {
    const { role } = req.user;
    if (role !== "communityMember" && role !== "admin") {
        req.flash("error", "Request denied: You lack the necessary permissions. Contact support if you think this is an error.");
        return res.redirect('/');
    }
    next();
}
module.exports.isAdmin = async (req, res, next) => {
    const { role } = req.user;
    if (role !== "admin") {
        // req.flash("error", "Request denied: You don't have permission to make changes on this page.");
        return res.json({ error: "Request denied: You don't have permission to make changes on this page." });
    }
    next();
}

module.exports.verified = async (req, res, next) => {
    let user ;
    if(req.user){
       user =  req.user
    }else{
        user = await User.findByUsername(req.body.username)
    }
    let role
    user ? { role } = user : req.flash("error", "unaccepted error");


    
    if (role == "Unverified") {
        req.flash("error", "Your payment has not been completed. If you have already made the payment, please wait up to 4 hours (Monday to Friday) for verification.");
        return res.redirect('/user/login');

    }
    next();
}
module.exports.isActivate = async (req, res, next) => {
    try {
    
        const user = await User.findByUsername(req.body.username);
        const token = await Token.findOne({ Email: req.body.username });
        if (!user.accStatus) {
            if (token) {
                req.flash("error", "You are not verified. Please check your email.");
            } else {
                 let token = new Token({  
                     Email: req.body.username,
               });
                    token = await token.save();
                    AccountVerification(token._id, user._id, user.username, user.name);
                    req.flash("error", "Your token has expired. We sent a new token. Please check your email.");
            }
            return res.redirect('/user/login');
        }
        next();
    } catch (error) {
         next();
    }
};


module.exports.APIAuthentication = async(req, res, next) => {
        const secret = req.headers.secret;
        const key = req.headers.key;
        console.log(secret+" " +key)
        if (!secret || !key) {
          return res.status(401).json({ error: "Authentication failed" });
        }
       
        try {
            const api = await Api.findById( key );
          if (!api || api.secret !== secret ||api.cloudname !==req.headers.folder ) {
            return res.status(403).json({ error: "Authentication failed or  Invalid credentials" });
          }
          console.log("hellow")
          return next();
        } catch (error) {
          console.error("Error during authentication:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      };


module.exports.checkStorage = async (req, res, next) => {
    try {
        const api = await Api.findById(req.headers.key).populate("user");
        const Plan = {
        Free: 5242880,
        Premium: 52428800, 
        Business: 209715200, 
        Enterprise: 1048576000 
        };

        if (api.user.usedStorage >= Plan[api.user.plan]) {
            return res.status(403).json({ error: "Your storage limit has been exceeded. Please upgrade your plan." });
        }
        return next();
    } catch (error) {
        console.error("Error during storage check:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
          
