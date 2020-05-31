const passport = require('passport');

module.exports = {
    login(req, res, next) {
        passport.authenticate('local', {
            session: false
        }, function(err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(400).json({ err: info.message });
            }
            req.login(user, loginErr => {
                if (loginErr) {
                    return next(loginErr);
                }
                return res.redirect('/members/' + user.id);
            });      
        })(req, res, next)
    }
}