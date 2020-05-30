const passport = require('passport');
const Member = require('../database/models/member');

module.exports = {
    login(req, res, next) {
        passport.authenticate('local', {
            session: false
        }, function(err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.json({ err: info.message });
            }
            req.login(user, loginErr => {
                if (loginErr) {
                    return next(loginErr);
                }
                return res.json({ id: user.id });
            });      
        })(req, res, next)
    },

    async changePassword(req, res) {
        const member = await Member.findById(req.params.id);
        if (!member) return res.json({ err: 'Membro não encontrado' })
        member.setPassword(req.body.password, function (err) {
            if (err) return res.json(err);
            member.save();
            return res.json({ message: 'Senha alterada com sucesso' });
        });
    }
}