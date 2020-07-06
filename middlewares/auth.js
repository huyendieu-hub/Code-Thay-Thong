module.exports = function(req, res, next) {
    //console.log("====================================="+req.session.userType);
    console.log("aaaaaaaaaaaaaaaaa_"+req.session.userId);
    console.log("aaaaaaaaaaaaaaaaa_"+req.session.userType);
    if (req.session.userType > 0) {
        console.log(req.session.userId);
        next();
    } else {
        //return res.send('Authentication Failed');
        return res.redirect('/accounts/login');
        next();
    }
    //next();
}